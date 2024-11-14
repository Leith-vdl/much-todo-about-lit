import { html, css, LitElement } from 'lit';
import './task-list.js'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 

class TodoApp extends LitElement {

  static properties = {
    newTaskText: { type: String },
    tasks: { type: Array }
  };

  constructor() {
    super();
    this.newTaskText = '';
    this.tasks = [];
  }

  handleInputChange(event) {
    this.newTaskText = event.target.value;
  }

  addTask() {
    if (this.newTaskText.trim() !== '') {
      this.tasks = [...this.tasks, { text: this.newTaskText, completed: false }];
      this.newTaskText = ''; 
    }
  }

  render() {
    return html`
      <h1 class="text-center mb-4">Todo List</h1>

      <div class="mb-3">
        <input
          type="text"
          .value="${this.newTaskText}"
          @input="${this.handleInputChange}"
          class="form-control"
          placeholder="What needs to be done?" />
      </div>
      
      <button @click="${this.addTask}" class="btn btn-primary w-100 mb-4">Add Task</button>
      
      <task-list .tasks="${this.tasks}"></task-list>
    `;
  }
}

customElements.define('todo-app', TodoApp);
