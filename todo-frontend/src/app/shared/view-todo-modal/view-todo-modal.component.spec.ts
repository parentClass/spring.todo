import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTodoModalComponent } from './view-todo-modal.component';

describe('ViewTodoModalComponent', () => {
  let component: ViewTodoModalComponent;
  let fixture: ComponentFixture<ViewTodoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTodoModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTodoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
