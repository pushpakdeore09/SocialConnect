package com.learn.socialmedia.service;

import com.learn.socialmedia.models.Comment;

public interface CommentService {
	
	public Comment createComment(Comment comments, Integer postId, Integer userId) throws Exception;
	
	public Comment likeComment(Integer commentId, Integer userId) throws Exception; 
	
	public Comment findCommentById(Integer commentId) throws Exception;

}
