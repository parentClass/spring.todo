package com.parentclass.todo.todo.integration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.parentclass.todo.TodoApplicationTests;
import com.parentclass.todo.models.Todo;
import com.parentclass.todo.models.TodoStatus;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.testcontainers.containers.MongoDBContainer;
import org.testcontainers.junit.jupiter.Container;

import java.util.ArrayList;
import java.util.List;

public class TodoIntegrationTest extends TodoApplicationTests {
  @Container public static MongoDBContainer mongoDBContainer = new MongoDBContainer("mongo:4.4.2");
  @Autowired MockMvc mockMvc;
  @Autowired ObjectMapper objectMapper;

  @DynamicPropertySource
  static void setProperties(DynamicPropertyRegistry registry) {
    registry.add("spring.data.mongodb.uri", mongoDBContainer::getReplicaSetUrl);
  }

  @Test
  void create_Should_ReturnCreatedTodo_Given_TodoObject() throws Exception {
    Todo mockedTodo =
        Todo.builder()
            .title("todo#1")
            .status(TodoStatus.TODO_STATUS_IN_PROGRESS.value())
            .is_deleted(false)
            .build();
    mockMvc
        .perform(
            MockMvcRequestBuilders.post("/todo/")
                .content(objectMapper.writeValueAsString(mockedTodo))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
        .andExpect(MockMvcResultMatchers.status().isOk())
        .andExpect(MockMvcResultMatchers.jsonPath("$.title").value(mockedTodo.getTitle()))
        .andExpect(MockMvcResultMatchers.jsonPath("$.note").value(mockedTodo.getNote()))
        .andExpect(MockMvcResultMatchers.jsonPath("$.status").value(mockedTodo.getStatus()));
  }

  @Test
  void getById_Should_ReturnTodo_Given_ValidTodoId() throws Exception {
    Todo mockedTodo = todoRepository.save(Todo.builder().title("todo#1").is_deleted(false).build());
    mockMvc
        .perform(
            MockMvcRequestBuilders.get("/{id}/todos/", mockedTodo.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
        .andExpect(MockMvcResultMatchers.status().isOk())
        .andExpect(MockMvcResultMatchers.jsonPath("$.title").value(mockedTodo.getTitle()))
        .andExpect(MockMvcResultMatchers.jsonPath("$.note").value(mockedTodo.getNote()))
        .andExpect(MockMvcResultMatchers.jsonPath("$.status").value(mockedTodo.getStatus()));
  }

  @Test
  void getAllTodos_Should_ReturnPaginatedTodos_Given_ValidPage() throws Exception {
    List<Todo> mockedTodos = new ArrayList<>();
    mockedTodos.add(Todo.builder().title("todo#1").is_deleted(false).build());
    mockedTodos.add(Todo.builder().title("todo#2").is_deleted(false).build());
    mockedTodos.add(Todo.builder().title("todo#3").is_deleted(false).build());
    todoRepository.saveAll(mockedTodos);
    mockMvc
        .perform(
            MockMvcRequestBuilders.get("/todos/?maxResult={maxResult}&page={page}", 100, 0)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
        .andExpect(MockMvcResultMatchers.status().isOk())
        .andExpect(
            MockMvcResultMatchers.header()
                .stringValues("TotalElements", String.valueOf(mockedTodos.size())))
        .andExpect(MockMvcResultMatchers.header().stringValues("TotalPages", String.valueOf(1)))
        .andExpect(MockMvcResultMatchers.header().stringValues("CurrentPage", String.valueOf(0)))
        .andExpect(MockMvcResultMatchers.header().stringValues("PerPage", String.valueOf(100)))
        .andExpect(MockMvcResultMatchers.jsonPath("$.content[*].title").isNotEmpty())
        .andExpect(MockMvcResultMatchers.jsonPath("$.content[*].note").isNotEmpty())
        .andExpect(MockMvcResultMatchers.jsonPath("$.content[*].status").isNotEmpty());
  }

  @Test
  void update_Should_ReturnUpdatedTodo_Given_TodoObject() throws Exception {
    Todo mockedTodo = todoRepository.save(Todo.builder().title("todo#1").is_deleted(false).build());
    mockedTodo.setTitle("updated value");
    mockedTodo.setNote("updated note");
    mockedTodo.setStatus(TodoStatus.TODO_STATUS_COMPLETED.value());
    mockMvc
        .perform(
            MockMvcRequestBuilders.put("/todo/?id=" + mockedTodo.getId())
                .content(objectMapper.writeValueAsString(mockedTodo))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
        .andExpect(MockMvcResultMatchers.status().isOk())
        .andExpect(MockMvcResultMatchers.jsonPath("$.title").value(mockedTodo.getTitle()))
        .andExpect(MockMvcResultMatchers.jsonPath("$.note").value(mockedTodo.getNote()))
        .andExpect(MockMvcResultMatchers.jsonPath("$.status").value(mockedTodo.getStatus()));
  }

  @Test
  void remove_Should_RemoveTodo_Given_TodoId() throws Exception {
    Todo mockedTodo = todoRepository.save(Todo.builder().title("todo#1").is_deleted(false).build());
    mockMvc
        .perform(
            MockMvcRequestBuilders.delete("/{id}/todo/", mockedTodo.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
        .andExpect(MockMvcResultMatchers.status().isOk());
  }
}
