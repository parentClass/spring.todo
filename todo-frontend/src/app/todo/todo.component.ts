import { Component, OnInit, ViewChild } from "@angular/core"
import { props, Store } from "@ngrx/store"
import { loadTodoEffect, loadTodos, removeTodo, State, Todo, updateTodo } from "../state/todo"
import { selectAllTodos, selectTodoState } from "../state/todo/todo.selectors"
import { TodoService } from "./todo.service"
import { Update, UpdateStr } from "@ngrx/entity/src/models"
import { UpdateTodoModalComponent } from "../shared/update-todo-modal/update-todo-modal.component"
import { NgbModal } from "@ng-bootstrap/ng-bootstrap"
import { ViewTodoModalComponent } from "../shared/view-todo-modal/view-todo-modal.component"

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  @ViewChild('content') content!: UpdateTodoModalComponent
  @ViewChild('viewTodo') viewTodo!: ViewTodoModalComponent

  todos$ = this.todoStore.select(selectAllTodos)

  constructor(private todoStore: Store<State>) { }

  ngOnInit(): void {
    this.todoStore.dispatch(loadTodoEffect())
  }

  finishTodo(todo: Todo) {
    const updatedTodo: Update<Todo> = {
      id: todo.id,
      changes: {
        ...todo,
        status: 'completed',
        completed_at: new Date()
      }
    }

    this.todoStore.dispatch(updateTodo({ todo: updatedTodo }))
  }

  removeTodo(todo: Todo) {
    this.todoStore.dispatch(removeTodo({ todo }))
  }

  updateTodo(todo: Todo) {
    const updatedTodo: Update<Todo> = {
      id: todo.id,
      changes: {
        ...todo
      }
    }

    this.todoStore.dispatch(updateTodo({ todo: updatedTodo }))
    this.content.closeModal()
  }

  openUpdateTodoModal(todo: Todo) {
    this.content.openModal(todo);
  }

  viewTodoModal(todo: Todo) {
    this.viewTodo.openModal(todo)
  }
}
