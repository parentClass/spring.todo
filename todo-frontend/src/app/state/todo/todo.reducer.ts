import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Todo } from './todo.model';
import * as TodoActions from './todo.actions';
import { v4 as uuidv4 } from 'uuid'

export interface State extends EntityState<Todo> {
  // additional state prop
}

export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>({
  sortComparer: (todo1: Todo, todo2: Todo) => todo2.created_at.toLocaleString()
    .localeCompare(todo1.created_at.toLocaleString())
});

export const initialState: State = adapter.getInitialState({
  // additional state prop
})

export const todoReducer = createReducer(
  initialState,
  on(TodoActions.loadTodos, (state, { todos }) => {
    return adapter.setAll(todos, state);
  }),
  on(TodoActions.updateTodo, (state, { todo }) => {
    return adapter.updateOne(todo, state);
  }),
  on(TodoActions.onCreateSuccess, (state, { todo }) => {
    return adapter.addOne(todo, state);
  }),
  on(TodoActions.removeTodo, (state, { todo }) => {
    return adapter.removeOne(todo.id, state)
  })
)

export const {
  selectAll
} = adapter.getSelectors();