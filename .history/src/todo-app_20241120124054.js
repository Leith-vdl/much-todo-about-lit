//This is the main component where the user interacts with the app. It allows the user to enter a new task, and it manages the list of tasks

import { html, LitElement } from 'https://cdn.skypack.dev/lit@2.6.1';
import './task-list.js';
import { tasksService } from './tasksService.js';

class TodoApp extends LitElement {
  static properties = {
    newTaskText: { type: String },
    tasks: { type: Array },
  };

  constructor() {
    super();
    this.newTaskText = '';
    this.tasks = tasksService.getTasks(); // Get tasks from the service
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    tasksService.saveTasks(); // Save tasks whenever they change
  }

  handleInputChange(event) {
    this.newTaskText = event.target.value;
  }

  addTask() {
    tasksService.addTask(this.newTaskText); // Use the service to add the task
    this.newTaskText = ''; // Clear input
    this.tasks = tasksService.getTasks(); // Update the tasks
  }

  toggleDarkMode() {
    document.body.classList.toggle('bg-dark');
    document.body.classList.toggle('text-light');
  }

  render() {
    return html`
      <div class="card shadow-sm p-4">
        <h1 class="text-center mb-4">To-Do List</h1>
        <div class="mb-3">
          <input
            type="text"
            .value="${this.newTaskText}"
            @input="${this.handleInputChange}"
            class="form-control"
            placeholder="What needs to be done?"
          />
        </div>
        <button @click="${this.addTask}" class="btn btn-primary w-100 mb-4">Add Task</button>
        <task-list .tasks="${this.tasks}"></task-list>
        <br />
        <button class="btn btn-secondary" @click="${this.toggleDarkMode}">Toggle Dark Mode</button>
      </div>
    `;
  }
}

customElements.define('todo-app', TodoApp);
