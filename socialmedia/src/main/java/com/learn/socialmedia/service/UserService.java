package com.learn.socialmedia.service;

import java.util.List;

import com.learn.socialmedia.exceptions.UserException;
import com.learn.socialmedia.models.User;

public interface UserService {

	public User registerUser(User user);
	
	public User findUserById(Integer userId) throws UserException;
	
	public User findUserByEmail(String email);
	
	public User followUser(Integer userId1, Integer userId2) throws UserException;
	
	public User updateUser(User user, Integer userId) throws UserException;
	
	public List<User> searchUser(String query); 
	
	public User findUserByJwt(String jwt);
}
