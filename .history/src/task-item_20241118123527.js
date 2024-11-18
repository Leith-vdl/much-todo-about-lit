//This represents an individual task. It displays the task text and provides functionality to toggle its completion or delete it.

import { html, css, LitElement } from 'https://cdn.skypack.dev/lit';

//defines an object that will hold the data for a single task (text string and completion boolean)
class TaskItem extends LitElement {
  static properties = {
    task: { type: Object }
  };

  //initializes the TaskItem with an empty description and a false completed boolean value
  constructor() {
    super();
    this.task = { text: '', completed: false };
  }

  //handles toggling completion of task, uses 'composed' and 'bubbles' to pass through DOM and Shadow DOM and allows parents to listen and update
  toggleComplete() {
    this.dispatchEvent(new CustomEvent('toggle-complete', { detail: this.task, bubbles: true, composed: true }));
  }

  //same as above but handles deletion of tasks
  deleteTask() {
    this.dispatchEvent(new CustomEvent('delete-task', { detail: this.task, bubbles: true, composed: true }));
  }

  //renders HTML using template literal the task text and a deletion button
  render() {
    return html`
      <div class="d-flex align-items-center justify-content-between">
        <span
          class="task-text ${this.task.completed ? 'completed' : ''} me-2"
          @click="${this.toggleComplete}">
          ${this.task.text}
        </span>
        <button class="btn btn-danger btn-sm" @click="${this.deleteTask}">X</button>
      </div>
    `;
  }
}

//registers the TaskItem class as a custom element using the provided tag
customElements.define('task-item', TaskItem);
