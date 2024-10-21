package com.learn.socialmedia.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.learn.socialmedia.models.Post;
import com.learn.socialmedia.models.User;
import com.learn.socialmedia.response.APIResponse;
import com.learn.socialmedia.service.PostService;
import com.learn.socialmedia.service.UserService;

@RestController
public class PostController {

	@Autowired
	PostService postService;

	@Autowired
	UserService userService;
	
	@PostMapping("/api/posts")
	public ResponseEntity<Post> createPost(@RequestHeader("Authorization") String jwt ,@RequestBody Post post) throws Exception{
		User regUser = userService.findUserByJwt(jwt); 
		Post createdPost = postService.createPost(post, regUser.getUserId());
		return new ResponseEntity<>(createdPost, HttpStatus.ACCEPTED);
	}

	@DeleteMapping("/api/posts/delete/{postId}")
	public ResponseEntity<APIResponse> deletePost(@PathVariable Integer postId, @RequestHeader("Authorization") String jwt) throws Exception {

		User regUSer = userService.findUserByJwt(jwt);
		String message = postService.deletePost(postId, regUSer.getUserId());
		APIResponse response = new APIResponse(message, true);
		return new ResponseEntity<APIResponse>(response, HttpStatus.OK);

	}
	
	@GetMapping("/api/posts/{postId}")
	public ResponseEntity<Post> findPostByIdHandler(@PathVariable Integer postId) throws Exception{
		
		Post post = postService.findPostById(postId);
		
		return new ResponseEntity<Post>(post, HttpStatus.ACCEPTED);
	}
	
	@GetMapping("/api/posts/user/{userId}")
	public ResponseEntity<List<Post>> findUsersPosts(@PathVariable Integer userId){
		
		List<Post> posts = postService.findPostByUserId(userId);
		return new ResponseEntity<List<Post>>(posts, HttpStatus.ACCEPTED);
		
	}
	
	@GetMapping("/api/posts")
	public ResponseEntity<List<Post>> findAllPost() throws Exception{
		
		List<Post> posts = postService.findAllPost();
		return new ResponseEntity<List<Post>>(posts, HttpStatus.ACCEPTED);
		
	}
	
	@PutMapping("/api/posts/save/{postId}")
	public ResponseEntity<Post> savedPostHandler(@PathVariable Integer postId, @RequestHeader("Authorization") String jwt) throws Exception{
		User regUser = userService.findUserByJwt(jwt); 
		Post post = postService.savedPost(postId, regUser.getUserId());
		
		return new ResponseEntity<Post>(post, HttpStatus.ACCEPTED);
	}
	
	@PutMapping("/api/posts/like/{postId}")
	public ResponseEntity<Post> likePostHandler(@PathVariable Integer postId, @RequestHeader("Authorization") String jwt) throws Exception{
		User regUser = userService.findUserByJwt(jwt);
		Post post = postService.likedPost(postId, regUser.getUserId());
		
		return new ResponseEntity<Post>(post, HttpStatus.ACCEPTED);
	}
}
