export class ToDo {
    id: number;
    title: string;
    due: string;
    assignedTo: string;
    done: string;
    
    constructor({id, title, due, assignedTo, done}) {
        this.id = id;
        this.title = title;
        this.due = due;
        this.assignedTo = assignedTo;
        this.done = done;
    }
}
