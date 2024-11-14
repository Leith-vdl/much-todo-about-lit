import { html, css, LitElement } from 'lit';


class TaskItem extends LitElement {
    static properties = {
        task: { type: Object }
    };

    constructor() {
        super();
        this.task = { text: '', completed: false };
    }

    

}