package com.learn.socialmedia.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.learn.socialmedia.models.Story;

@Repository
public interface StoryRepository extends JpaRepository<Story, Integer> {

	public List<Story> findByUser_UserId(Integer userId);
}
