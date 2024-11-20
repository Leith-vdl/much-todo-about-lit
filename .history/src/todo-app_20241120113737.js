//This is the main component where the user interacts with the app. It allows the user to enter a new task, and it manages the list of tasks

import { html, css, LitElement } from 'https://cdn.skypack.dev/lit@2.6.1'
import './task-list.js';

// Defines the TodoApp component
class TodoApp extends LitElement {

  // Define properties for the component; task objects and an array to hold them
  static properties = {
    newTaskText: { type: String },  
    tasks: { type: Array }      
  };

  // Constructor sets the properties when the component is created, both set to empty by default
  constructor() {
    super();
    this.newTaskText = '';
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  }
  
  //adds tasks to a local JSON file allowing them to persist after refreshing the page
  updated(changedProperties) {
    super.updated(changedProperties);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
  
  // Handles changes in the input field, updating the newTaskText property when user enters a task
  handleInputChange(event) {
    this.newTaskText = event.target.value; 
  }

  // Adds the new task to the tasks array, ignores if blank (whitespace). Clears the input field after task created
  addTask() {
    if (this.newTaskText.trim() !== '') {
      this.tasks = [...this.tasks, { text: this.newTaskText, completed: false }];
      this.newTaskText = '';
    }
  }

  // Disable Shadow DOM for this component, uses light DOM instead
  createRenderRoot() {
    return this; 
  }

  // logic for dark mode toggle button
  toggleDarkMode() {
    console.log(`toggle: there are  ${this.tasks.length} tasks`);


    document.body.classList.toggle('bg-dark');
    document.body.classList.toggle('text-light');
  }  

  // Renders the component using string literals, setting the layout, listening for inpout, adding add/delete buttons
  render() {
    return html`
      <div class="card shadow-sm p-4">
        <h1 class="text-center mb-4">To-Do List</h1>

        <!-- Input field for new task -->
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
        <br>
   
        <button class="btn btn-secondary" @click="${this.toggleDarkMode}">Toggle Dark Mode</button>

      </div>
    `;
  }
}

// Register the TodoApp custom element
customElements.define('todo-app', TodoApp);

