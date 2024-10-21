package com.learn.socialmedia.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.learn.socialmedia.models.Comment;

public interface CommentRepository extends JpaRepository<Comment, Integer> {

}
