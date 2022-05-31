import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, map, Observable } from 'rxjs';
import { Todo, Todos } from '../state/todo';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private apiUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) { }

  getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todos>(this.apiUrl + "todos/?maxResult=100&page=0")
      .pipe(map((todos) => todos.content || []));
  }

  createTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl + "todo/", todo);
  }

  updateTodoStatus(todo: Partial<Todo>, id: String): Observable<Todo> {
    return this.http.put<Todo>(this.apiUrl + "todo/?id=" + id, todo)
      .pipe(map((todo) => todo || EMPTY));
  }

  removeTodo(id: String): Observable<any> {
    return this.http.delete(this.apiUrl + id + "/todo/")
  }
}