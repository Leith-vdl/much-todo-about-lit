import { html, css, LitElement } from 'lit';
import './task-item.js';

class TaskList extends LitElement {
  static properties = {
    tasks: { type: Array }
  };

  constructor() {
    super();
    this.tasks = [];
  }

  handleToggleComplete(event) {
    const updatedTask = event.detail;
    this.tasks = this.tasks.map(task => 
      task.text === updatedTask.text ? { ...task, completed: !task.completed } : task
    );
  }

  handleDeleteTask(event) {
    const taskToDelete = event.detail;
    this.tasks = this.tasks.filter(task => task.text !== taskToDelete.text);
  }

  render() {
    return html`
      <ul class="list-group">
        ${this.tasks.map(
          task => html`
            <li class="list-group-item">
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

customElements.define('task-list', TaskList);
