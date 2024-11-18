//This represents an individual task. It displays the task text and provides functionality to toggle its completion or delete it.

// Import necessary modules from LitElement
import { html, css, LitElement } from 'https://cdn.skypack.dev/lit@2.6.1';

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
    this.requestUpdate(); // Ensure re-render happens
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
