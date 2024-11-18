import { html, render, LitElement } from 'lit';

//defines an object that will hold the data for a single task
class TaskItem extends LitElement {
  static properties = {
    task: { type: Object }
  };

  //initializes the TaskItem with an empty description and a false completed boolean value
  constructor() {
    super();
    this.task = { text: '', completed: false };
  }

  //handles toggling completion of task, uses 'composed' and 'bubbles' to pass through DOM and Shadow DOM and allows parents to listen
  toggleComplete() {
    this.dispatchEvent(new CustomEvent('toggle-complete', { detail: this.task, bubbles: true, composed: true }));
  }

  //same as above but handles deletion of tasks
  deleteTask() {
    this.dispatchEvent(new CustomEvent('delete-task', { detail: this.task, bubbles: true, composed: true }));
  }

  //renders HTML using template literal
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

//1 of the 3 main API's in web componenrs, registers TaskItem as a custom tag
customElements.define('task-item', TaskItem);
