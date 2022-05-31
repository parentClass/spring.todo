package com.parentclass.todo;

import com.parentclass.todo.implementations.TodoImpl;
import com.parentclass.todo.repositories.TodoRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.testcontainers.junit.jupiter.Testcontainers;

@Testcontainers
@SpringBootTest
@AutoConfigureMockMvc
@RunWith(SpringRunner.class)
public abstract class TodoApplicationTests {
  @Autowired protected TodoImpl todo;
  @Autowired protected TodoRepository todoRepository;

  @AfterEach
  public void after() {
    todoRepository.deleteAll();
  }
}
