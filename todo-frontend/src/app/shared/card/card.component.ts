import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from 'src/app/state/todo';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() todo!: Todo;
  @Output() finishTodo: EventEmitter<Todo> = new EventEmitter();
  @Output() removeTodo: EventEmitter<Todo> = new EventEmitter();
  @Output() updateTodo: EventEmitter<Todo> = new EventEmitter();
  @Output() openUpdateTodoModal: EventEmitter<Todo> = new EventEmitter();
  @Output() viewTodoModal: EventEmitter<Todo> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  identifyTodoStatus(status: string): string {
    return status !== 'completed' ? 'bg-primary' : 'bg-success'
  }

  isTodoCompleted(status: string): string {
    return status === 'completed' ? 'visually-hidden' : ''
  }

  canTodoBeRemoved(status: string): string {
    return status === 'completed' ? '' : 'visually-hidden'
  }

  toggleTodo(todo: Todo) {
    this.finishTodo.emit(todo);
  }

  doRemoveTodo(todo: Todo) {
    this.removeTodo.emit(todo);
  }

  doUpdateTodo(todo: Todo) {
    this.openUpdateTodoModal.emit(todo);
  }

  doViewTodo(todo: Todo) {
    this.viewTodoModal.emit(todo);
  }
}
