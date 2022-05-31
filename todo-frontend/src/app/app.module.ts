import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TodoRoutingModule } from './todo/todo-routing.module';
import { TodoComponent } from './todo/todo.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { TodoStateModule } from './state/state.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { CardComponent } from './shared/card/card.component';
import { todoStatusPipe } from './pipe/todo.pipe';
import { AddTodoModalComponent } from './shared/add-todo-modal/add-todo-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateTodoModalComponent } from './shared/update-todo-modal/update-todo-modal.component';
import { ViewTodoModalComponent } from './shared/view-todo-modal/view-todo-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    NavbarComponent,
    CardComponent,
    todoStatusPipe,
    AddTodoModalComponent,
    UpdateTodoModalComponent,
    ViewTodoModalComponent
  ],
  imports: [
    BrowserModule,
    TodoRoutingModule,
    HttpClientModule,
    TodoStateModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
