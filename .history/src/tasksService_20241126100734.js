//TasksService handles the buisness logic for updating, deleting and adding tasks to the list array from localStorage

class TaskService {
    
    //cheacks if any tasks in local storgae and loads them if so, otherwise loads an empty array
    constructor() {
      this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    }

    // converts tasks array into JSON abnd saves them in their current state to localStorage as 'tasks'
    saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  
    // fetches the current array of tasks
    getTasks() {
      return this.tasks;
    }
  
    // if not whitespace, adds a new task (with properties) to the taskList array using spread (...), then updates list to local storage
    addTask(newTaskText) {
      if (newTaskText.trim() !== '') {
        const newTask = { text: newTaskText, completed: false };
        this.tasks = [...this.tasks, newTask];
        this.saveTasks();
      }
    }
  
    // toggles completion state (bool property) of tasks, line-through if complete
    toggleTaskCompletion(task) {
      const updatedTask = { ...task, completed: !task.completed };
      const index = this.tasks.findIndex(t => t.text === task.text);
      if (index !== -1) {
        this.tasks = [
          ...this.tasks.slice(0, index),
          updatedTask,
          ...this.tasks.slice(index + 1)
        ];
      }
    
      this.saveTasks();
    }
  
    // handles task deletion
    deleteTask(taskToDelete) {
      this.tasks = this.tasks.filter(task => task.text !== taskToDelete.text);
      this.saveTasks();
    }
  }
  
  export const tasksService = new TaskService();
  