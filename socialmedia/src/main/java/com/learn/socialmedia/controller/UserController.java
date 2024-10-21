package com.learn.socialmedia.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.learn.socialmedia.models.User;
import com.learn.socialmedia.repository.UserRepository;
import com.learn.socialmedia.service.UserService;

@RestController
public class UserController {

	@Autowired
	UserRepository userRepository;
	
	@Autowired
	UserService userService;
	
	@GetMapping("/api/users")
	public List<User> getUsers(){
		List<User> users = userRepository.findAll();
		
		return users;
	}
	
	@GetMapping("/api/users/{userId}")
	public User getUserById(@PathVariable Integer userId) throws Exception {
		System.out.println("fetch user");
		User user = userService.findUserById(userId);
		return user;
		
	}
	
	
	@PutMapping("/api/users/update") 
	public User updateUser(@RequestBody User user, @RequestHeader("Authorization") String jwt) throws Exception {
		
		User regUser = userService.findUserByJwt(jwt);
		
		User updatedUser = userService.updateUser(user, regUser.getUserId());
		
		return updatedUser;
	}
	
	@PutMapping("/api/follow/{userId2}")
	public User followUserHandler(@RequestHeader("Authorization") String jwt, @PathVariable Integer userId2) throws Exception {
		
		User regUser = userService.findUserByJwt(jwt); 
		User user = userService.followUser(regUser.getUserId(), userId2);
		return user;
	}
	
	@GetMapping("/api/search")
	public List<User> searchUSer(@RequestParam("query") String query){
		List<User> users = userService.searchUser(query);
		
		return users;
	}
	
	@GetMapping("/api/users/profile")
	public User getUserFromToken(@RequestHeader("Authorization") String jwt) {
		
		User user = userService.findUserByJwt(jwt);
		user.setPassword(null);
		return user;
	}
	
}
