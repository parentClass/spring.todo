import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { createTodo, State, Todo } from 'src/app/state/todo';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-todo-modal',
  templateUrl: './add-todo-modal.component.html',
  styleUrls: ['./add-todo-modal.component.css']
})
export class AddTodoModalComponent implements OnInit {
  @ViewChild('addTodoModalContent') content!: TemplateRef<any>
  @Output() addTodo: EventEmitter<FormGroup> = new EventEmitter();

  todoForm = new FormGroup({
    title: new FormControl(''),
    note: new FormControl('')
  });

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openModal() {
    this.modalService.open(this.content)
  }

  closeModal() {
    this.modalService.dismissAll(this.content);
  }

  onAddTodo() {
    this.addTodo.emit(this.todoForm);
  }
}
