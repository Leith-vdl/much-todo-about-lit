//This represents an individual task. It displays the task text and provides functionality to toggle its completion or delete it.

//import { html, css, LitElement } from 'lit';
import { html, css, LitElement,nothing } from 'https://cdn.skypack.dev/lit@2.6.1'

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

  // Deletes the task and dispatches the event to the parent component
  deleteTask() {
    this.dispatchEvent(new CustomEvent('delete-task', { detail: this.task, bubbles: true, composed: true }));
  }

  toggleCompleteTask() {
    this.task.completed = !this.task.completed
    this.requestUpdate()
  }

  // Renders the HTML template for a task item
  render() {
    return html`
      <!-- Task item layout -->
      <div class="d-flex align-items-center justify-content-between">
        <!-- Task text, toggling completion on click -->
        <button class="btn btn-primary btn-sm" @click="${this.toggleCompleteTask}">${this.task.completed ? 'undo' : 'done'}</button>

        <span ${this.task.completed ? ` style="text-decoration: line-through" ` : nothing }>
          ${this.task.text}
          
          ${this.task.completed ? ` IS COMPLETE ` : ` NOT COMPLETE` }
        </span>
        
        <!-- Delete button -->
        <button class="btn btn-danger btn-sm" @click="${this.deleteTask}">X</button>
      </div>
    `;
  }
}

// Registers TaskItem as a custom HTML element (tag)
customElements.define('task-item', TaskItem);
