//TasksService handles the logic for updating, deleting and adding tasks to the list array from localStorage

class TaskService {
    constructor() {
      // Initialize tasks from localStorage or as an empty array
      this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    }
  
    // Method to get all tasks
    getTasks() {
      return this.tasks;
    }
  
    // Method to add a new task
    addTask(newTaskText) {
      if (newTaskText.trim() !== '') {
        const newTask = { text: newTaskText, completed: false };
        this.tasks = [...this.tasks, newTask];
        this.saveTasks();
      }
    }
  
    // Method to toggle completion of a task
    toggleTaskCompletion(task) {
      task.completed = !task.completed;
      this.saveTasks();
    }
  
    // Method to delete a task
    deleteTask(taskToDelete) {
      this.tasks = this.tasks.filter(task => task.text !== taskToDelete.text);
      this.saveTasks();
    }
  
    // Method to persist tasks to localStorage
    saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  }
  
  export const tasksService = new TaskService();
  