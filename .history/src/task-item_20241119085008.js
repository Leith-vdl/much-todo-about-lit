//This represents an individual task. It displays the task text and provides functionality to toggle its completion or delete it.

import { html, css, LitElement } from 'https://cdn.skypack.dev/lit@2.6.1';

class TaskItem extends LitElement {
  static properties = {
    task: { type: Object }
  };

  constructor() {
    super();
    this.task = { text: '', completed: false };
  }

  // Deletes the task and dispatches an event to the parent component
  deleteTask() {
    this.dispatchEvent(new CustomEvent('delete-task', { 
      detail: this.task, 
      bubbles: true, 
      composed: true 
    }));
  }

  // Toggles the completion status of the task
  toggleCompleteTask() {
    this.task.completed = !this.task.completed;
    this.requestUpdate();
  }

  // Render the task item with conditional styling based on completion status
  render() {
    return html`
      <div class="task-item d-flex justify-content-between align-items-center">
        <!-- Task completion toggle button -->
        <button 
          class="btn btn-primary btn-sm" 
          @click="${this.toggleCompleteTask}">
          ${this.task.completed ? 'Undo' : '✅'}
        </button>

        <!-- Task text with conditional styling -->
        <span class="${this.task.completed ? 'completed' : ''}">
          ${this.task.text}
        </span>

        <!-- Delete button -->
        <button 
          class="btn btn-danger btn-sm" 
          @click="${this.deleteTask}">
          ❌
        </button>
      </div>
    `;
  }

  static styles = css`
    .completed {
      text-decoration: line-through;
      color: #6c757d; /* Optional: fade the text color to indicate completion */
    }

    .task-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 5px 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      margin-bottom: 10px;
    }
  `;
}

customElements.define('task-item', TaskItem);
