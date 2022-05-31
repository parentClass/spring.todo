package com.parentclass.todo.todo.implementation;

import com.parentclass.todo.TodoApplicationTests;
import com.parentclass.todo.models.Todo;
import com.parentclass.todo.models.TodoStatus;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.MongoDBContainer;
import org.testcontainers.junit.jupiter.Container;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class TodoImplementationTest extends TodoApplicationTests {
  @Container public static MongoDBContainer mongoDBContainer = new MongoDBContainer("mongo:4.4.2");

  @DynamicPropertySource
  static void setProperties(DynamicPropertyRegistry registry) {
    registry.add("spring.data.mongodb.uri", mongoDBContainer::getReplicaSetUrl);
  }

  @Test
  void should_CreateTodo_Given_ValidTodoObjectToCreate() {
    Todo expectedTodo = Todo.builder().title("todo#1").is_deleted(false).build();
    Todo actualTodo = todo.create(expectedTodo);
    assertEquals(expectedTodo, actualTodo);
  }

  @Test
  void should_GetTodo_Given_ValidTodoIdToGet() {
    Todo mockedTodo = Todo.builder().title("todo#1").is_deleted(false).build();
    Todo expectedTodo = todoRepository.save(mockedTodo);
    Todo actualTodo = todo.getById(expectedTodo.getId());
    Assertions.assertThat(actualTodo)
        .usingRecursiveComparison()
        .ignoringFields("created_at")
        .isEqualTo(expectedTodo);
  }

  @Test
  void should_GetAllTodos_Given_ValidListOfTodos() {
    List<Todo> mockedTodos = new ArrayList<>();
    mockedTodos.add(Todo.builder().title("todo#1").is_deleted(false).build());
    mockedTodos.add(Todo.builder().title("todo#2").is_deleted(false).build());
    List<Todo> expectedTodos = todoRepository.saveAll(mockedTodos);
    List<Todo> actualTodos = todo.getAllTodos(100, 0).toList();
    Assertions.assertThat(actualTodos)
        .usingRecursiveComparison()
        .ignoringFields("created_at")
        .isEqualTo(expectedTodos);
  }

  @Test
  void should_UpdateTodo_Given_ValidTodoToUpdate() {
    Todo expectedTodo =
        todoRepository.save(Todo.builder().title("todo#1")
                .status(TodoStatus.TODO_STATUS_IN_PROGRESS.value()).is_deleted(false).build());
    // Update todo title
    expectedTodo.setTitle("updated todo.");
    Todo actualTodo = todo.update(expectedTodo, expectedTodo.getId());
    assertEquals(expectedTodo, actualTodo);
  }

  @Test
  void should_RemoveTodo_Given_ValidTodoIdToRemove() {
    Todo mockTodo = todoRepository.save(Todo.builder().title("todo#1").is_deleted(false).build());
    // Remove todo
    todo.remove(mockTodo.getId());
    // Try to find the todo
    Optional<Todo> requestedTodo = todoRepository.findById(mockTodo.getId());
    assertTrue(requestedTodo.isEmpty());
  }
}
