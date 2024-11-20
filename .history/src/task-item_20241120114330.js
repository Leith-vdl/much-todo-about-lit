//This represents an individual task. It displays the task text and provides functionality to toggle its completion or delete it.

import { html, LitElement } from 'https://cdn.skypack.dev/lit@2.6.1';

class TaskItem extends LitElement {

  // Define properties for the component, holds the task object data.
  static properties = {
    tasks: { type: Object, reflect:true, attribute: true } 
  };

  // Constructor to initialize the component state, defaults to empty and false completed
  constructor() {
    super();
    this.task = { text: '', completed: false }; 
  }

  // Deletes tasks and updates the list, allowing travel through the DOM (composed) for parents to listen (bubble)
  deleteTask() {
    this.dispatchEvent(new CustomEvent('delete-task', { 
      detail: this.task,      
      bubbles: true,         
      composed: true         
    }));
  }

  // Toggles the completion status of the task (completed or not)
  toggleCompleteTask() {
    // Toggle the completed state of the task
    this.task.completed = !this.task.completed;
    // Trigger an update to reflect the changes in the DOM
    this.requestUpdate();
  }

  // Disable Shadow DOM for this component, using light DOM instead
  createRenderRoot() {
    return this;
  }

  // Render the task item layout using Lit's HTML template, with completion class toggle and deletion
  render() {
    return html`
      <div class="task-item d-flex align-items-center">

        <button 
          class="btn btn-primary btn-sm" 
          @click="${this.toggleCompleteTask}">
          ${this.task.completed ? '↩️' : '✅'}  
        </button>
        
        <span class="${this.task.completed ? 'text-muted text-decoration-line-through' : ''} flex-grow-1 px-3">
          ${this.task.text} 
        </span>

        <button 
          class="btn btn-danger btn-sm ms-auto" 
          @click="${this.deleteTask}">
          ✘  
        </button>
      </div>
    `;
  }
}

// Register the custom element with the browser so it can be used as <task-item>
customElements.define('task-item', TaskItem);
