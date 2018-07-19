import { Injectable } from '@angular/core';
import { ToDo } from '../classes/to-do';
import { HttpClient } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) {}

  public getTodos() {
    return this.http.get<ToDo[]>('http://localhost:9000/ToDos');
  }

  public getTodoById(id: any) {
    return this.http.get<ToDo>('http://localhost:9000/ToDos/' + id);
  } 

  public addTodo(todo:ToDo) {
    return this.http.post<any>('http://localhost:9000/ToDos', todo);
  }

  public editTodoById(id: any, todo:ToDo) {
    return this.http.put<ToDo>('http://localhost:9000/ToDos/' + id, todo);
  }

  public deleteTodoById(id: any) {
    return this.http.delete<any>('http://localhost:9000/ToDos/' + id);
  }
 
}
