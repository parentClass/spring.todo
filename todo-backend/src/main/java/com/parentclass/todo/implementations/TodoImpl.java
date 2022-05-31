package com.parentclass.todo.implementations;

import com.parentclass.todo.handlers.TodoHandler;
import com.parentclass.todo.models.Todo;
import com.parentclass.todo.models.TodoStatus;
import com.parentclass.todo.repositories.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;

@Component
public class TodoImpl implements TodoHandler {
  @Autowired private final TodoRepository todoRepository;

  public TodoImpl(TodoRepository todoRepository) {
    this.todoRepository = todoRepository;
  }

  @Override
  public Todo create(Todo body) {
    body.setId(null);
    body.setStatus(TodoStatus.TODO_STATUS_IN_PROGRESS.value());
    body.setIs_deleted(false);
    return this.todoRepository.save(body);
  }

  @Override
  public Todo getById(String id) {
    return this.todoRepository
        .findById(id)
        .orElseThrow(
            () ->
                new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Todo requested does not exist."));
  }

  @Override
  public Page<Todo> getAllTodos(Integer maxResult, Integer page) {
    return this.todoRepository.findAll(
        PageRequest.of(page, maxResult, Sort.by("created_at").descending()));
  }

  @Override
  public Todo update(Todo todo, String id) {
    Todo foundTodo =
        this.todoRepository
            .findById(id)
            .orElseThrow(
                () ->
                    new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Todo requested for modification does not exist."));
    if (foundTodo.getId().equals(todo.getId()) && todo.getStatus().equals(TodoStatus.TODO_STATUS_COMPLETED.value()))
      todo.setCompleted_at(LocalDateTime.now());
    todo.setId(foundTodo.getId());
    return this.todoRepository.save(todo);
  }

  @Override
  public Todo remove(String id) {
    Todo foundTodo =
        this.todoRepository
            .findById(id)
            .orElseThrow(
                () ->
                    new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Todo requested for modification does not exist."));
    foundTodo.setIs_deleted(true);
    return this.todoRepository.save(foundTodo);
  }
}
