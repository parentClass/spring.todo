import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter, State } from '.';

export const selectTodoState = createFeatureSelector<State>('todos')

export const selectAllTodos = createSelector(
    selectTodoState,
    adapter.getSelectors().selectAll
)