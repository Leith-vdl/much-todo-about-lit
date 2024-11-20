//This component receives the tasks from todo-app and renders them as a list. It also handles task completion and deletion.

import { html, LitElement } from 'https://cdn.skypack.dev/lit@2.6.1';
import './task-item.js';
import { tasksService } from './tasksService.js';

class TaskList extends LitElement {
  static properties = {
    tasks: { type: Array },
  };

  constructor() {
    super();
    this.tasks = [];
  }

  handleToggleComplete(event) {
    const task = event.detail;
    tasksService.toggleTaskCompletion(task); // Use the service to toggle completion
    this.tasks = tasksService.getTasks(); // Update the tasks after toggling
  }

  handleDeleteTask(event) {
    const taskToDelete = event.detail;
    tasksService.deleteTask(taskToDelete); // Use the service to delete the task
    this.tasks = tasksService.getTasks(); // Update the tasks after deletion
  }

  render() {
    return html`
      <ul class="list-group">
        ${this.tasks.map(
          (task) => html`
            <li class="list-group-item d-flex justify-content-between align-items-center">
              <task-item
                .task="${task}"
                @toggle-complete="${this.handleToggleComplete}"
                @delete-task="${this.handleDeleteTask}"
              ></task-item>
            </li>
          `
        )}
      </ul>
    `;
  }
}

customElements.define('task-list', TaskList);
