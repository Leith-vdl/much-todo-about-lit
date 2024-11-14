import { html, css, LitElement } from 'lit';

class TaskItem extends LitElement {
  static properties = {
    task: { type: Object }
  };

  constructor() {
    super();
    this.task = { text: '', completed: false };
  }

  toggleComplete() {
    this.dispatchEvent(new CustomEvent('toggle-complete', { detail: this.task, bubbles: true, composed: true }));
  }

  deleteTask() {
    this.dispatchEvent(new CustomEvent('delete-task', { detail: this.task, bubbles: true, composed: true }));
  }

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

customElements.define('task-item', TaskItem);
