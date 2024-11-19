//This represents an individual task. It displays the task text and provides functionality to toggle its completion or delete it.

import { html, LitElement } from 'https://cdn.skypack.dev/lit@2.6.1';

class TaskList extends LitElement {

  // Define properties for the component, holding the list of tasks
  static properties = {
    tasks: { type: Array }
  };

  // Constructor to initialize the task list
  constructor() {
    super();
    this.tasks = [];  // Initialize tasks as an empty array
  }

  // Method to add a task when the Enter key is pressed
  addTask(event) {
    if (event.key === 'Enter' && event.target.value.trim() !== '') {
      const newTask = {
        text: event.target.value,
        completed: false
      };
      this.tasks = [...this.tasks, newTask];  // Add the new task to the task list
      event.target.value = '';  // Clear the input field after adding the task
    }
  }

  // Render the input field and list of tasks
  render() {
    return html`
      <!-- Input field for adding a new task -->
      <input 
        type="text" 
        class="form-control mb-3" 
        placeholder="Type a task and press Enter" 
        @keydown="${this.addTask}">
      
      <!-- Task list rendered with task-item components -->
      <div>
        ${this.tasks.map(task => html`
          <task-item .task="${task}"></task-item>
        `)}
      </div>
    `;
  }
}

// Register the custom element with the browser so it can be used as <task-list>
customElements.define('task-list', TaskList);
