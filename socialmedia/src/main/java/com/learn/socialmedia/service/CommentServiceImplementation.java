package com.learn.socialmedia.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.learn.socialmedia.models.Comment;
import com.learn.socialmedia.models.Post;
import com.learn.socialmedia.models.User;
import com.learn.socialmedia.repository.CommentRepository;
import com.learn.socialmedia.repository.PostRepository;

@Service
public class CommentServiceImplementation implements CommentService {

	@Autowired
	private PostService postService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private PostRepository postRepository;
	
	@Autowired
	private CommentRepository commentRepository;
	@Override
	public Comment createComment(Comment comment, Integer postId, Integer userId) throws Exception {
		
		User user = userService.findUserById(userId);
		Post post = postService.findPostById(postId);
		
		comment.setUser(user);
		comment.setContent(comment.getContent());
		comment.setCreatedAt(LocalDateTime.now());
		
		Comment savedComment = commentRepository.save(comment);
		
		post.getComments().add(savedComment);
		
		postRepository.save(post);
		return savedComment;
	}

	@Override
	public Comment likeComment(Integer commentId, Integer userId) throws Exception {
		Comment comment = findCommentById(commentId);
		User user = userService.findUserById(userId);
		
		if(!comment.getLiked().contains(user)) {
			comment.getLiked().add(user);
		}
		else comment.getLiked().remove(user);
		return commentRepository.save(comment);
	}

	@Override
	public Comment findCommentById(Integer commentId) throws Exception {
		Optional<Comment> comment = commentRepository.findById(commentId);
		
		if(comment.isEmpty()) {
			throw new Exception("Comment does not exists");
		}
		return comment.get();
	}

}
