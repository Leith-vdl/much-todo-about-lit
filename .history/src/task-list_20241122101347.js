//This component receives the tasks from todo-app and renders them as a list. It also handles task completion and deletion.

import { html, LitElement } from 'https://cdn.skypack.dev/lit@2.6.1';
import './task-item.js';
import { tasksService } from './tasksService.js';

class TaskList extends LitElement {
  // holds an array of task objects
  static properties = {
    tasks: { type: Array },
  };

  // creates empty tasks array
  constructor() {
    super();
    this.tasks = [];
  }

  // calls tasksService to update the completion status of the task of toggled task (held in event.detail) then updates state using getTasks
  handleToggleComplete(event) {
    const task = event.detail;
    tasksService.toggleTaskCompletion(task); 
    this.tasks = tasksService.getTasks(); 
  }
  

  // calls tasksService to remove the task from the list (held in event.detail) then updates state using getTasks
  handleDeleteTask(event) {
    const taskToDelete = event.detail;
    tasksService.deleteTask(taskToDelete); 
    this.tasks = tasksService.getTasks(); 
  }

  // renders using light DOM to allow Bootstrap to run
  createRenderRoot() {
    return this;
  }

  // defines the HTML structure of the task list array using string literals
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
