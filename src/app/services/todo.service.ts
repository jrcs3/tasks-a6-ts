import { Injectable } from '@angular/core';
import { ToDo } from '../classes/to-do';
import { HttpClient } from '@angular/common/http'

export class AppSettings {
  public static API_ENDPOINT = 'http://localhost:9000/';
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) {}

  public getTodos() {
    return this.http.get<ToDo[]>(AppSettings.API_ENDPOINT + 'ToDos');
  }

  public getTodoById(id: any) {
    return this.http.get<ToDo>(AppSettings.API_ENDPOINT + 'ToDos/' + id);
  } 

  public addTodo(todo:ToDo) {
    return this.http.post<any>(AppSettings.API_ENDPOINT + 'ToDos', todo);
  }

  public editTodoById(id: any, todo:ToDo) {
    return this.http.put<ToDo>(AppSettings.API_ENDPOINT + 'ToDos/' + id, todo);
  }

  public deleteTodoById(id: any) {
    return this.http.delete<any>(AppSettings.API_ENDPOINT + 'ToDos/' + id);
  }
 
}
