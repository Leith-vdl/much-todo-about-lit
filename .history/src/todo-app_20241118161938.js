//This is the main component where the user interacts with the app. It allows the user to enter a new task, and it manages the list of tasks

//import { html, css, LitElement } from 'lit';
import { html, css, LitElement } from 'https://cdn.skypack.dev/lit@2.6.1'
import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';

import './task-list.js'; 

// Defines the TodoApp component
class TodoApp extends LitElement {

  // Define the component's properties
  static properties = {
    newTaskText: { type: String },
    tasks: { type: Array }
  };

  // Called when a new instance of the TodoApp component is created
  constructor() {
    super();
    this.newTaskText = ''; // Initialize new task text as an empty string
    this.tasks = []; // Initialize tasks array as an empty array
  }

  // Handles input change to update the newTaskText
  handleInputChange(event) {
    this.newTaskText = event.target.value;
  }

  // Adds a new task to the tasks array
  addTask() {
    if (this.newTaskText.trim() !== '') {
      this.tasks = [...this.tasks, { text: this.newTaskText, completed: false }];
      this.newTaskText = '';
    }
  }

  // Renders the HTML template for the TodoApp
  render() {
    return html`
      <!-- Card Layout -->
      <div class="card shadow-sm p-4">
        <h1 class="text-center mb-4">To-Do List</h1>

        <!-- Input field for new task -->
        <div class="mb-3">
          <input
            type="text"
            .value="${this.newTaskText}"
            @input="${this.handleInputChange}"
            class="form-control"
            placeholder="What needs to be done?" />
        </div>
        
        <!-- Button to add a new task -->
        <button @click="${this.addTask}" class="btn btn-primary w-100 mb-4">Add Task</button>
        
        <!-- Display Task List -->
        <task-list .tasks="${this.tasks}"></task-list>
      </div>
    `;
  }
}

// Registers TodoApp as a custom HTML element (tag)
customElements.define('todo-app', TodoApp);

