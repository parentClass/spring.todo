package com.parentclass.todo.models;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document
@Builder
public class Todo {
  @Id private String id;
  private String title;
  private String note;
  private String status;
  private Boolean is_deleted;
  @CreatedDate private LocalDateTime created_at;
  private LocalDateTime completed_at;
}
