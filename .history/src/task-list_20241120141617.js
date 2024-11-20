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

  // calls toggleTaskCompletion from tasksService and updates the state
  handleToggleComplete(event) {
    const task = event.detail;
    tasksService.toggleTaskCompletion(task); 
    this.tasks = tasksService.getTasks(); 
  }

  // // calls deleteTask from tasksService to handle deletion of tasks, then updates array
  handleDeleteTask(event) {
    const taskToDelete = event.detail;
    tasksService.deleteTask(taskToDelete); 
    this.tasks = tasksService.getTasks(); 
  }

  // renders using light DOM to allow Bootstrap to run
  createRenderRoot() {
    return this;
  }

  // renders the content onto the page using HTML string literals
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
