import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { State, updateTodo } from 'src/app/state/todo';
import { Todo } from 'src/app/state/todo/todo.model';

@Component({
  selector: 'app-update-todo-modal',
  templateUrl: './update-todo-modal.component.html',
  styleUrls: ['./update-todo-modal.component.css']
})
export class UpdateTodoModalComponent implements OnInit {
  @ViewChild('updateModalContent') content!: TemplateRef<any>
  @Output() updateTodo: EventEmitter<Todo> = new EventEmitter();

  todoForm = new FormGroup({
    id: new FormControl(''),
    title: new FormControl(''),
    note: new FormControl(''),
    status: new FormControl(''),
    is_deleted: new FormControl(''),
    created_at: new FormControl('')
  });

  constructor(private modalService: NgbModal, private storeService: Store<State>) { }

  ngOnInit(): void {
  }

  openModal(todo: Todo) {
    this.todoForm.setValue({
      id: todo.id,
      title: todo.title,
      note: todo.note,
      status: todo.status,
      is_deleted: todo.is_deleted,
      created_at: todo.created_at
    })

    this.modalService.open(this.content);
  }

  onUpdateTodo() {
    this.updateTodo.emit(this.todoForm.value);
  }

  closeModal() {
    this.modalService.dismissAll()
  }
}
