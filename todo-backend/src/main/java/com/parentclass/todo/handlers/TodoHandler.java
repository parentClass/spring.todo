package com.parentclass.todo.handlers;

import com.parentclass.todo.models.Todo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

public interface TodoHandler {
  /**
   * Create todo
   *
   * @param body json body of the todo to be recorded
   * @return Todo, the recorded todo object
   */
  Todo create(Todo body);

  /**
   * Get todo by id
   *
   * @param id unique identifier for the todo
   * @return Todo, object with values of the looked up todo
   */
  Todo getById(String id);

  /**
   * Get all todos by page
   *
   * @param maxResult size of records per page
   * @param page current page to request
   * @return Page, paginated todos
   */
  Page<Todo> getAllTodos(Integer maxResult, Integer page);

  /**
   * Update todo
   *
   * @param todo json body of the todo to be updated
   * @return Todo, the updated todo object
   */
  Todo update(Todo todo, String id);

  /**
   * Remove todo
   *
   * @param id unique identifier for the todo
   */
  Todo remove(String id);
}

@Controller
class TodoController {
  @Autowired TodoHandler todoControllerHandler;

  @RequestMapping(path = "/todo/", method = RequestMethod.POST)
  public ResponseEntity<Todo> create(@RequestBody Todo body) {
    return ResponseEntity.ok(todoControllerHandler.create(body));
  }

  @RequestMapping(path = "/{id}/todos/", method = RequestMethod.GET)
  public ResponseEntity<Todo> getById(@PathVariable String id) {
    return ResponseEntity.ok(todoControllerHandler.getById(id));
  }

  @RequestMapping(path = "/todos/", method = RequestMethod.GET)
  public ResponseEntity<Page<Todo>> getAllTodos(
      @RequestParam Integer maxResult, @RequestParam Integer page) {
    Page<Todo> todos = todoControllerHandler.getAllTodos(maxResult, page);
    HttpHeaders httpHeaders = new HttpHeaders();
    httpHeaders.add("TotalElements", String.valueOf(todos.getTotalElements()));
    httpHeaders.add("TotalPages", String.valueOf(todos.getTotalPages()));
    httpHeaders.add("CurrentPage", String.valueOf(page));
    httpHeaders.add("PerPage", String.valueOf(maxResult));
    return ResponseEntity.ok().headers(httpHeaders).body(todos);
  }

  @RequestMapping(path = "/todo/", method = RequestMethod.PUT)
  public ResponseEntity<Todo> update(@RequestBody Todo todo, @RequestParam String id) {
    return ResponseEntity.ok(todoControllerHandler.update(todo, id));
  }

  @RequestMapping(path = "/{id}/todo/", method = RequestMethod.DELETE)
  public ResponseEntity<Todo> remove(@PathVariable String id) {
    return ResponseEntity.ok(todoControllerHandler.remove(id));
  }
}
