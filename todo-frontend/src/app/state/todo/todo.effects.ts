import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, exhaustMap, map, mergeMap, switchMap } from 'rxjs';
import { TodoService } from 'src/app/todo/todo.service';
import * as TodoActions from './todo.actions'


@Injectable()
export class TodoEffects {

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.loadTodoEffect),
      mergeMap(() =>
        this.todoService.getAllTodos()
          .pipe(
            map(todos => TodoActions.loadTodos({ todos })),
            catchError(() => EMPTY)
          )
      )
    )
  )

  updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.updateTodo),
      switchMap((action) =>
        this.todoService.updateTodoStatus(action.todo.changes, action.todo.changes.id!)
          .pipe(
            map(() => TodoActions.onUpdateSuccess()),
            catchError(() => EMPTY)
          )
      )
    )
  )

  createTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.createTodo),
      switchMap((action) =>
        this.todoService.createTodo(action.todo)
          .pipe(
            map((todo) => TodoActions.onCreateSuccess({ todo })),
            catchError(() => EMPTY)
          )
      )
    )
  )

  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.removeTodo),
      switchMap((action) =>
        this.todoService.removeTodo(action.todo.id)
          .pipe(
            map(() => TodoActions.onRemoveTodoSuccess()),
            catchError(() => EMPTY)
          )
      )
    )
  )

  constructor(
    private actions$: Actions,
    private todoService: TodoService
  ) { }

}
