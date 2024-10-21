package com.learn.socialmedia.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.learn.socialmedia.models.Reels;

@Repository
public interface ReelsRepository extends JpaRepository<Reels, Integer> {

	public List<Reels> findByUser_UserId(Integer userId);
}
