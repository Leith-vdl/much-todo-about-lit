// Import necessary modules from LitElement
import { html, css, LitElement } from 'https://cdn.skypack.dev/lit@2.6.1';
import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

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

  // Renders the task item layout
  render() {
    return html`
      <div class="task-item">
        <!-- Task completion toggle button -->
        <button 
          class="btn btn-primary btn-sm" 
          @click="${this.toggleCompleteTask}">
          ${this.task.completed ? 'Undo' : '✅'}
        </button>

        <!-- Task text, conditionally styled if completed -->
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
}

// Registers TaskItem as a custom HTML element (tag)
customElements.define('task-item', TaskItem);
