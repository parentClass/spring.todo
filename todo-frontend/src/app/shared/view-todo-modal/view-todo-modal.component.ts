import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Todo } from 'src/app/state/todo/todo.model';

@Component({
  selector: 'app-view-todo-modal',
  templateUrl: './view-todo-modal.component.html',
  styleUrls: ['./view-todo-modal.component.css'],
})
export class ViewTodoModalComponent implements OnInit {
  @ViewChild('viewTodoModalContent') content!: TemplateRef<any>;
  todo!: Todo;

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  openModal(todo: Todo) {
    this.todo = todo;
    this.modalService.open(this.content);
  }
}
