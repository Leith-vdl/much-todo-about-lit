//This is the main component where the user interacts with the app. It allows the user to enter a new task, and it manages the list of tasks

import { html, LitElement } from 'https://cdn.skypack.dev/lit@2.6.1';
import './task-list.js';
import { tasksService } from './tasksService.js';

// sets the properties of the task (string) and task list (array)
class TodoApp extends LitElement {
  static properties = {
    newTaskText: { type: String }, 
    tasks: { type: Array },         
  };

  // initialise all new tasks as empty strings bt default, and fetches tasks from local storage
  constructor() {
    super();
    this.newTaskText = '';                       
    this.tasks = tasksService.getTasks();  
  }

  //saves the tasks whenever a change is made
  updated(changedProperties) {
    super.updated(changedProperties);
    tasksService.saveTasks();          
  }

  // updates newTaskText with the text entered in the input field
  handleInputChange(event) {
    this.newTaskText = event.target.value;
  }

  // adds a task to the array, then clears the inpur field and updates the tasks array
  addTask() {
    tasksService.addTask(this.newTaskText);  
    this.newTaskText = '';                       
    this.tasks = tasksService.getTasks();        
  }

  // toggles "dark mode" for the body background and text colour
  toggleDarkMode() {
    document.body.classList.toggle('bg-dark');   
    document.body.classList.toggle('text-light'); 
  }

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
            placeholder="What needs to be done?"
          />
        </div>

        <!-- Button to add new task -->
        <button @click="${this.addTask}" class="btn btn-primary w-100 mb-4">Add Task</button>
        
        <!-- Task list component -->
        <task-list .tasks="${this.tasks}"></task-list>
        
        <br />
        
        <!-- Button to toggle dark mode -->
        <button class="btn btn-secondary" @click="${this.toggleDarkMode}">Toggle Dark Mode</button>
      </div>
    `;
  }
}

// Register the TodoApp custom element
customElements.define('todo-app', TodoApp);
