import { html, css, LitElement } from 'lit';
import './task-list.js'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 

// Defines a new class (TodoApp) which is a custom web component
class TodoApp extends LitElement {

  // Define the components properties: a string to hold the task name and an array for the list of tasks 
  static properties = {
    newTaskText: { type: String },
    tasks: { type: Array }
  };

  // Called when a new instance of the web TodoApp is created
  constructor() {
    super();
    this.newTaskText = '';
    this.tasks = [];
  }

  // Listens for input of a new task being written then re-renders the component with the new text
  handleInputChange(event) {
    this.newTaskText = event.target.value;
  }

  // Checks text input and trims whitespace, then copies existing list of tasks and adds the new one to it, finally resets the input field 
  addTask() {
    if (this.newTaskText.trim() !== '') {
      this.tasks = [...this.tasks, { text: this.newTaskText, completed: false }];
      this.newTaskText = ''; 
    }
  }

  // Returns HTML template literal to be rendered
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

// Registers TodoApp as a custom tag
customElements.define('todo-app', TodoApp);
