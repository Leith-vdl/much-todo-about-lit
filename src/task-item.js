//This represents an individual task. It displays the task text and provides functionality to toggle its completion or delete it.

import { html, css, LitElement } from 'lit';

// Defines the TaskItem component
class TaskItem extends LitElement {
  static properties = {
    task: { type: Object }
  };

  // Initializes the task object with text and completion status
  constructor() {
    super();
    this.task = { text: '', completed: false };
  }

  // Toggles the task completion and dispatches the event to the parent component
  toggleComplete() {
    this.dispatchEvent(new CustomEvent('toggle-complete', { detail: this.task, bubbles: true, composed: true }));
  }

  // Deletes the task and dispatches the event to the parent component
  deleteTask() {
    this.dispatchEvent(new CustomEvent('delete-task', { detail: this.task, bubbles: true, composed: true }));
  }

  // Renders the HTML template for a task item
  render() {
    return html`
      <!-- Task item layout -->
      <div class="d-flex align-items-center justify-content-between">
        <!-- Task text, toggling completion on click -->
        <span
          class="task-text ${this.task.completed ? 'completed' : ''} me-2"
          @click="${this.toggleComplete}">
          ${this.task.text}
        </span>
        
        <!-- Delete button -->
        <button class="btn btn-danger btn-sm" @click="${this.deleteTask}">X</button>
      </div>
    `;
  }
}

// Registers TaskItem as a custom HTML element (tag)
customElements.define('task-item', TaskItem);
