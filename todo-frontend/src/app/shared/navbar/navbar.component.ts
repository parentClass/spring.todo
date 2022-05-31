import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { createTodo, State, Todo } from 'src/app/state/todo';
import { AddTodoModalComponent } from '../add-todo-modal/add-todo-modal.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @ViewChild('content') content!: AddTodoModalComponent

  constructor(private todoStore: Store<State>) { }

  ngOnInit(): void {
  }

  open() {
    this.content.openModal()
  }

  addTodo(todo: FormGroup) {
    this.todoStore.dispatch(
      createTodo({
        todo: <Todo>{
          title: todo.value.title,
          note: todo.value.note,
          status: 'in_progress'
        }
      })
    )

    this.content.closeModal();
  }
}
