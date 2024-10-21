package com.learn.socialmedia.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.learn.socialmedia.models.Post;
import com.learn.socialmedia.models.User;
import com.learn.socialmedia.repository.PostRepository;
import com.learn.socialmedia.repository.UserRepository;

@Service
public class PostServiceImplementation implements PostService {

	@Autowired
	PostRepository postRepository;
	
	@Autowired
	UserService userService;
	
	@Autowired
	UserRepository userRepository;
	
	@Override
	public Post createPost(Post post, Integer userId) throws Exception {
		
		Post newPost = new Post();
		User user = userService.findUserById(userId);
		newPost.setUser(user);
		newPost.setCaption(post.getCaption());
		newPost.setImage(post.getImage());
		newPost.setVideo(post.getVideo());
		newPost.setCreatedAt(LocalDateTime.now());
		return postRepository.save(newPost);
	}

	@Override
	public String deletePost(Integer postId, Integer userId) throws Exception {
		
		Post post = findPostById(postId);
		User user = userService.findUserById(userId);
		
		if(post.getUser().getUserId()!=user.getUserId()) {
			throw new Exception("You can't delete another users post!");
		}
		postRepository.delete(post);
		return "Post Successfully deleted";
	}

	@Override
	public List<Post> findPostByUserId(Integer userId) {
		return postRepository.findPostByUserId(userId);
		
	}

	@Override
	public Post findPostById(Integer postId) throws Exception {
		Optional<Post> post = postRepository.findById(postId);
		if(post.isEmpty()) {
			throw new Exception("Post not found with postId: "+postId);
		}
		return post.get();
	}

	@Override
	public List<Post> findAllPost() throws Exception {
		return postRepository.findAll();
	}

	@Override
	public Post savedPost(Integer postId, Integer userId) throws Exception {
		Post post = findPostById(postId);
		User user = userService.findUserById(userId);
		
		if(user.getSavedPosts().contains(post)) {
			user.getSavedPosts().remove(post);
		} else {
			user.getSavedPosts().add(post);
		}
		userRepository.save(user);
		return post;
	}

	@Override
	public Post likedPost(Integer postId, Integer userId) throws Exception {
		Post post = findPostById(postId);
		User user = userService.findUserById(userId);
		
		if(post.getLiked().contains(user)) {
			post.getLiked().remove(user);
		} else {
			post.getLiked().add(user);
		}
		
		return postRepository.save(post);
	}

}
