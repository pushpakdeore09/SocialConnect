package com.learn.socialmedia.service;

import java.util.List;

import com.learn.socialmedia.models.Post;

public interface PostService {

	Post createPost(Post post, Integer userId) throws Exception;
	
	String deletePost(Integer postId, Integer userId) throws Exception;
	
	List<Post> findPostByUserId(Integer userId);
	
	Post findPostById(Integer postId) throws Exception;
	
	List<Post> findAllPost() throws Exception;
	
	Post savedPost(Integer postId, Integer userId) throws Exception;
	
	Post likedPost(Integer postId, Integer userId) throws Exception;
	
}
