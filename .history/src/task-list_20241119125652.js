//This component receives the tasks from todo-app and renders them as a list. It also handles task completion and deletion.

import { html, css, LitElement } from 'https://cdn.skypack.dev/lit@2.6.1';
import './task-item.js';

class TaskList extends LitElement {

  // Define properties for the list of tasks passed from the parent component (TodoApp)
  static properties = {
    tasks: { type: Array }  
  };

  // Constructor initializes the tasks array
  constructor() {
    super();
    this.tasks = [];
  }

  // Adds a task when the Enter key is pressed, then clears the input field
  addTask(event) {
    if (event.key === 'Enter' && event.target.value.trim() !== '') {
      const newTask = {
        text: event.target.value,
        completed: false
      };
      this.tasks = [...this.tasks, newTask]; // Add new task to the list
      event.target.value = ''; // Clear the input field after adding the task
    }
  }

  // Removes the selected task from the tasks array
  handleDeleteTask(event) {
    const taskToDelete = event.detail;  
    this.tasks = this.tasks.filter(task => task.text !== taskToDelete.text);  
  }

  // Handle completion toggle (if needed)
  handleToggleComplete(event) {
    const taskToComplete = event.detail;
    this.tasks = this.tasks.map(task => 
      task.text === taskToComplete.text 
        ? { ...task, completed: !task.completed }
        : task
    );
  }

  // Disable Shadow DOM for this component
  createRenderRoot() {
    return this; 
  }

  // Defines the structure of the TaskList, mapping over each task in the tasks array
  render() {
    return html`
      <!-- Input field to add tasks -->
      <input 
        type="text" 
        placeholder="Add a new task" 
        @keydown="${this.addTask}"  <!-- Listen for the keydown event in the existing input field -->
        class="form-control mb-3">

      <!-- List of tasks -->
      <ul class="list-group">
        ${this.tasks.map(task => html`
          <li class="list-group-item d-flex justify-content-between align-items-center">
            <task-item .task="${task}"  
                       @toggle-complete="${this.handleToggleComplete}" 
                       @delete-task="${this.handleDeleteTask}"> 
            </task-item>
          </li>` 
        )}
      </ul>
    `;
  }
}

// Register the TaskList custom element
customElements.define('task-list', TaskList);
