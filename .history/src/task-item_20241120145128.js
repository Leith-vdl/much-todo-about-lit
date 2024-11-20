//This represents an individual task. It displays the task text and provides functionality to toggle its completion or delete it.

import { html, LitElement } from 'https://cdn.skypack.dev/lit@2.6.1';

class TaskItem extends LitElement {
  // task holds the properties of individual tasks (string and bool) as an object
  static properties = {
    task: { type: Object },
  };

  // initialises the item, setting properties to empty by default
  constructor() {
    super();
    this.task = { text: '', completed: false };
  }

  // deleteTask() {
  //   this.dispatchEvent(
  //     new CustomEvent('delete-task', {
  //       detail: this.task,
  //       bubbles: true,
  //       composed: true,
  //     })
  //   );
  // }

  // toggleCompleteTask() {
  //   this.dispatchEvent(
  //     new CustomEvent('toggle-complete', {
  //       detail: this.task,
  //       bubbles: true,
  //       composed: true,
  //     })
  //   );
  // }

  
  // renders using light DOM to allow Bootstrap to run
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div class="task-item d-flex align-items-center">
        <button class="btn btn-primary btn-sm" @click="${this.toggleCompleteTask}">
          ${this.task.completed ? '↩️' : '✅'}
        </button>

        <span
          class="${this.task.completed ? 'text-muted text-decoration-line-through' : ''} flex-grow-1 px-3"
          >${this.task.text}</span
        >

        <button class="btn btn-danger btn-sm ms-auto" @click="${this.deleteTask}">✘</button>
      </div>
    `;
  }
}

customElements.define('task-item', TaskItem);
