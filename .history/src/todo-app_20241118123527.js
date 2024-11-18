//This is the main component where the user interacts with the app. It allows the user to enter a new task, and it manages the list of tasks

import { html, css, LitElement } from 'https://cdn.skypack.dev/lit';
import './task-list.js'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 

//defines a new class (TodoApp) which is a custom web component
class TodoApp extends LitElement {

  //DEFINES the components properties: a string to hold the task name and an array for the list of tasks 
  static properties = {
    newTaskText: { type: String },
    tasks: { type: Array }
  };

  //CREATES and activates when a new instance of the web TodoApp is created
  constructor() {
    super();
    this.newTaskText = '';
    this.tasks = [];
  }

  //string that holds the text that's input by the user  
  handleInputChange(event) {
    this.newTaskText = event.target.value;
  }

  //checks text isn't just whitespace, adds the task to the array, and then resets the input field 
  addTask() {
    if (this.newTaskText.trim() !== '') {
      this.tasks = [...this.tasks, { text: this.newTaskText, completed: false }];
      this.newTaskText = ''; 
    }
  }

  //returns HTML template literal to render a title, input field, trigger button and the task-list component to display the tasks
  render() {
    return html`
      <h1 class="text-center mb-4">To-Do List</h1>

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

////1 of the 3 main API's in web componenrs, registers TodoApp as a custom tag
customElements.define('todo-app', TodoApp);
