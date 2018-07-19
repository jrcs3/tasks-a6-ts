import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToDo } from '../../classes/to-do';
import { Subscription } from 'rxjs';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit, OnDestroy {

  toDoList: ToDo[];
  private subscriptions: Subscription[] = [];
  private api: TodoService;

  constructor(
    api: TodoService
  ) {
    this.api = api;
  }

  ngOnInit() {
    this.loadList();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private loadList() {
    this.subscriptions.push(
      this.api.getTodos().subscribe(result => {
        this.toDoList = result;
      }, error => console.error(error))
    );
  }

  deleteToDo(id) {
    this.subscriptions.push(
      this.api.deleteTodoById(id).subscribe(result => {
        this.loadList();
      }, error => console.error(error))
    );
  }
}
