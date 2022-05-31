package com.parentclass.todo.repositories;

import com.parentclass.todo.models.Todo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface TodoRepository extends MongoRepository<Todo, String> {

  @Override
  @Query("{'is_deleted': false, '_id': ?0, 'is_deleted': false}")
  Optional<Todo> findById(String s);

  @Override
  @Query("{'is_deleted': false}")
  Page<Todo> findAll(Pageable pageable);
}
