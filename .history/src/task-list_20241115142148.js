import { html, css, LitElement } from 'lit';
import './task-item.js';

//defines the array that will hold the task list
class TaskList extends LitElement {
  static properties = {
    tasks: { type: Array }
  };

  //initializes tasks as an empty array
  constructor() {
    super();
    this.tasks = [];
  }

  //toggles the completion state of tasks, checks the task against the list, then updates the list if complete
  handleToggleComplete(event) {
    const updatedTask = event.detail;
    this.tasks = this.tasks.map(task => 
      task.text === updatedTask.text ? { ...task, completed: !task.completed } : task
    );
  }

  //removes task from the list when event (button) is triggered
  handleDeleteTask(event) {
    const taskToDelete = event.detail;
    this.tasks = this.tasks.filter(task => task.text !== taskToDelete.text);
  }

  //renders the task list
  render() {
    return html`
      <ul class="list-group">
        ${this.tasks.map(task => html`
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
