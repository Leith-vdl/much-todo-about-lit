import { html, render, LitElement } from 'lit';
import './task-item.js';

//the array that holds thge list of tasks passed from the parent component
class TaskList extends LitElement {
  static properties = {
    tasks: { type: Array }
  };

  //initializes tasks as an empty array
  constructor() {
    super();
    this.tasks = [];
  }

  // when text is clicked checks the task against the list, then toggles the completion state of the task
  handleToggleComplete(event) {
    const updatedTask = event.detail;
    this.tasks = this.tasks.map(task => 
      task.text === updatedTask.text ? { ...task, completed: !task.completed } : task
    );
  }

  //removes task from the list when event (button) is triggered, "X"
  handleDeleteTask(event) {
    const taskToDelete = event.detail;
    this.tasks = this.tasks.filter(task => task.text !== taskToDelete.text);
  }

  //renders the task list
  render() {
    return html`
      <ul class="list-group">
        ${this.tasks.map(task => html`
          <li class="list-group-item">
            <task-item .task="${task}" 
                       @toggle-complete="${this.handleToggleComplete}"
                       @delete-task="${this.handleDeleteTask}">
            </task-item>
          </li>`
        )}
      </ul>
    `;
  }
}

///registers the TaskList class as a custom element using the provided tag
customElements.define('task-list', TaskList);
