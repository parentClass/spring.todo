package com.parentclass.todo.models;

public enum TodoStatus {
  TODO_STATUS_IN_PROGRESS("in_progress"),
  TODO_STATUS_COMPLETED("completed");

  private final String status;

  TodoStatus(String status) {
    this.status = status;
  }

  public String value() {
    return status;
  }
}
