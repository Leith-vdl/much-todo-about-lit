//TasksService handles the buisness logic for updating, deleting and adding tasks to the list array from localStorage

class TaskService {
    //cheacks if any tasks in local storgae and loads them if so, otherwise loads an empty array
    constructor() {
      // Initialize tasks from localStorage or as an empty array
      this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    }

    // converts tasks array into JSON abnd saves them in their current state to localStorage as 'tasks'
    saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  
    // fetches the array of tasks
    getTasks() {
      return this.tasks;
    }
  
    // adds a new task to the taskList array
    addTask(newTaskText) {
      if (newTaskText.trim() !== '') {
        const newTask = { text: newTaskText, completed: false };
        this.tasks = [...this.tasks, newTask];
        this.saveTasks();
      }
    }
  
    // toggles completion of tasks, line-through if complete
    toggleTaskCompletion(task) {
      task.completed = !task.completed;
      this.saveTasks();
    }
  
    // handles task deletion
    deleteTask(taskToDelete) {
      this.tasks = this.tasks.filter(task => task.text !== taskToDelete.text);
      this.saveTasks();
    }
  }
  
  export const tasksService = new TaskService();
  