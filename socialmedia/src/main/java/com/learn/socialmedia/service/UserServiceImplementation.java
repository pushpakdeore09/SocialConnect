package com.learn.socialmedia.service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.learn.socialmedia.config.JwtProvider;
import com.learn.socialmedia.exceptions.UserException;
import com.learn.socialmedia.models.User;
import com.learn.socialmedia.repository.UserRepository;


@Service
public class UserServiceImplementation implements UserService {

	@Autowired
	UserRepository userRepository;

	@Override
	public User registerUser(User user) {
		
		User newUser = new User();
		
		newUser.setEmail(user.getEmail());
		newUser.setFirstName(user.getFirstName());
		newUser.setLastName(user.getLastName());
		newUser.setPassword(user.getPassword());
		newUser.setUserId(user.getUserId());
		
		User savedUser = userRepository.save(user);
		
		return savedUser;
	}

	@Override
	public User findUserById(Integer userId) throws UserException {
		Optional<User> user = userRepository.findById(userId);
		
		if(user.isPresent()) {
			return user.get();
		}
		
		throw new UserException("User does not exits by userId: " + userId);
	}

	@Override
	public User findUserByEmail(String email) {
		User user = userRepository.findByEmail(email);
		return user;
	}

	@Override
	public User followUser(Integer regUserId1, Integer userId2) throws UserException {
		
		User regUser = findUserById(regUserId1);
		User user2 = findUserById(userId2);
		
		user2.getFollowers().add(regUser.getUserId());
		regUser.getFollowings().add(user2.getUserId());
		
		userRepository.save(regUser);
		userRepository.save(user2);
		return regUser;
	}

	@Override
	public User updateUser(User user, Integer userId) throws UserException { 
		Optional<User> oldUser = userRepository.findById(userId);
		
		try {
			if(oldUser.isEmpty()) {
				throw new UserException("User does not exists with userId: "+ userId);
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		User updatedUser = oldUser.get();
		
		if(user.getFirstName()!=null) {
			updatedUser.setFirstName(user.getFirstName());  
		}
		if(user.getLastName()!=null) {
			updatedUser.setLastName(user.getLastName());
		}
		if(user.getEmail()!=null) {
			updatedUser.setEmail(user.getEmail());
		}
		if(user.getGender()!=null) {
			updatedUser.setGender(user.getGender());
		}
		
		User savedUser = userRepository.save(updatedUser);
		return savedUser;
	}

	@Override
	public List<User> searchUser(String query) {
		return userRepository.searchUser(query);
	}

	@Override
	public User findUserByJwt(String jwt) {
		String email = JwtProvider.getEmailFromJwtToken(jwt);
		User user = userRepository.findByEmail(email);
		return user;
	}

}
