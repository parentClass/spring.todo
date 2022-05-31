import { Update } from '@ngrx/entity';
import { UpdateStr } from '@ngrx/entity/src/models';
import { createAction, props } from '@ngrx/store';
import { Todo } from '.';

const BASE_ACTION_PREFIX = '[Todo/API] '

export const loadTodoEffect = createAction(
  BASE_ACTION_PREFIX + 'Load Todos Effect'
)

export const loadTodos = createAction(
  BASE_ACTION_PREFIX + 'Load Todos',
  props<{ todos: Todo[] }>()
);

export const updateTodo = createAction(
  BASE_ACTION_PREFIX + 'Update Todo',
  props<{ todo: UpdateStr<Todo> }>()
)

export const onUpdateSuccess = createAction(
  BASE_ACTION_PREFIX + 'Update Todo Success'
)

export const createTodo = createAction(
  BASE_ACTION_PREFIX + 'Create Todo',
  props<{ todo: Todo }>()
)

export const onCreateSuccess = createAction(
  BASE_ACTION_PREFIX + 'Create Todo Success',
  props<{ todo: Todo }>()
)

export const removeTodo = createAction(
  BASE_ACTION_PREFIX + 'Remove Todo',
  props<{ todo: Todo }>()
)

export const onRemoveTodoSuccess = createAction(
  BASE_ACTION_PREFIX + 'Remove Todo Success'
)