import { Injectable } from '@angular/core';
import { ToDo } from '../classes/to-do';
import { HttpClient } from '@angular/common/http'

export class AppSettings {
  public static API_ENDPOINT = 'http://localhost:9000/';
}

@Injectable({
  providedIn: 'root'
})

//This class is intened to simulate a AngularJS service using $resource.
export class TodoService {

  constructor(private http: HttpClient) {}

  public query() {
    return this.http.get<ToDo[]>(AppSettings.API_ENDPOINT + 'ToDos');
  }

  public get(id: any) {
    return this.http.get<ToDo>(AppSettings.API_ENDPOINT + 'ToDos/' + id);
  } 

  public add(todo:ToDo) {
    return this.http.post<any>(AppSettings.API_ENDPOINT + 'ToDos', todo);
  }

  public edit(id: any, todo:ToDo) {
    return this.http.put<ToDo>(AppSettings.API_ENDPOINT + 'ToDos/' + id, todo);
  }

  public delete(id: any) {
    return this.http.delete<any>(AppSettings.API_ENDPOINT + 'ToDos/' + id);
  }
 
}
