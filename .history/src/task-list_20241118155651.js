//This component receives the tasks from todo-app and renders them as a list. It also handles task completion and deletion.

// import { html, css, LitElement } from 'lit';
import { html, css, LitElement } from 'https://cdn.skypack.dev/lit@2.6.1'
import './task-item.js';

// Defines the TaskList component
class TaskList extends LitElement {
  static properties = {
    tasks: { type: Array }
  };

  // Initializes the tasks array as an empty array
  constructor() {
    super();
    this.tasks = [];
  }

  // Handles task deletion
  handleDeleteTask(event) {
    const taskToDelete = event.detail;
    this.tasks = this.tasks.filter(task => task.text !== taskToDelete.text);
  }

  // Handles task completion toggle
  handleToggleComplete(event) {
    const updatedTask = event.detail;
    // Update the task in the tasks array with the new completed status
    this.tasks = this.tasks.map(task =>
      task.text === updatedTask.text ? updatedTask : task
    );
  }

  // Renders the task list
  render() {
    return html`
      <!-- List of tasks -->
      <ul class="list-group">
        ${this.tasks.map(task => html`
          <li class="list-group-item d-flex justify-content-between align-items-center">
            <task-item .task="${task}" 
                       @toggle-complete="${this.handleToggleComplete}"
                       @delete-task="${this.handleDeleteTask}">
            </task-item>
          </li>`)}
      </ul>
    `;
  }
}

// Registers TaskList as a custom HTML element (tag)
customElements.define('task-list', TaskList);
