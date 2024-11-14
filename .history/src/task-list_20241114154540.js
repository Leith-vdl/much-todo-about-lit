import { html, css, LitElement } from 'lit';


class TaskList extends LitElement {
    static properties = {
        tasks: { type: Array }
    };

    constructor() {
        super();
        this.tasks = [];
    }

    toggleComplete() {
        this.dispatchEvent(new CustomEvent('toggle-complete', {detail: this.tasks, bubbles: true, composed: true }));
    }

    deleteTask() {
        this.dispatchEvent(new CustomEvent('delete-task', { detail: this.tasks, bubbles: true, composed: true }));
    }

    render() {
        return html`
        <div class="d-flex align-itemsd-center justify-content-between">
            <span
                class="task-text ${this.task.completed ? 'completed' : ''} me-2"
                @click="${this.toggleComplete}">
                ${this.task.text}
            </span>
            <button class="btn btn-danger btn-sm" @click="${this.deletedTask}">X</button>
        </div>
        `;
    }
}