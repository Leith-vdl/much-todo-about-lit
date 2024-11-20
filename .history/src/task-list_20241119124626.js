//This component receives the tasks from todo-app and renders them as a list. It also handles task completion and deletion.

import { html, css, LitElement } from 'https://cdn.skypack.dev/lit@2.6.1'
import './task-item.js';

// Defines the TaskList component responsible for displaying the array of all tasks
class TaskList extends LitElement {

  // Define properties for the list of tasks passed from the parent component (TodoApp)
  static properties = {
    tasks: { type: Array }  
  };

  // starts the tasks array as empty 
  constructor() {
    super();
    this.tasks = [];
  }

  // Adds a task when the Enter key is pressed, then clears the input field
  addTask(event) {
    if (KeyboardEvent === 'Enter' && event.target.value.trim() !== '') {
      const newTask = {
        text: event.target.value,
        completed: false
      };
      this.tasks = [...this.tasks, newTask]; 
      event.target.value = ''; 
    }
  }

  // removes the selected task from the tasks array
  handleDeleteTask(event) {
    const taskToDelete = event.detail;  
    this.tasks = this.tasks.filter(task => task.text !== taskToDelete.text);  
  }

  // Disable Shadow DOM for this component
  createRenderRoot() {
    return this; 
  }

  // defiens the structure of the TaskList mappping over each task in the tasks array and rendering a TaskItem for each, listens for complete/delete
  render() {
    return html`
      <!-- List of tasks -->
      <ul class="list-group">
        ${this.tasks.map(task => html`
          
          <li class="list-group-item d-flex justify-content-between align-items-center">
            <task-item .task="${task}"  
                       @keydown="${this.addTask}"
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