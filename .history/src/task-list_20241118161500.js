import { html, css, LitElement } from 'https://cdn.skypack.dev/lit@2.6.1';
import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
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
          </li>
        `)}
      </ul>
    `;
  }
}

// Registers TaskList as a custom HTML element (tag)
customElements.define('task-list', TaskList);


