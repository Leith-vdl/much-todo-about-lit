import { html, css, LitElement } from 'lit';



class TodoApp extends LitElement {

    static properties = {
        newTaskText: { type: String  },
        tasks: { type: Array }
    };

    constructor() {
        super();
        this.newTaskText = '';
        this.tasks = []
    }

}

