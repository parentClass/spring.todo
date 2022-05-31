import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTodoModalComponent } from './update-todo-modal.component';

describe('UpdateTodoModalComponent', () => {
  let component: UpdateTodoModalComponent;
  let fixture: ComponentFixture<UpdateTodoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTodoModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTodoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
