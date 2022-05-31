import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store'
import { todoReducer } from './todo';
import { EffectsModule } from '@ngrx/effects';
import { TodoEffects } from './todo/todo.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot({
      todos: todoReducer
    }),
    EffectsModule.forRoot([
      TodoEffects
    ])
  ]
})
export class TodoStateModule { }
