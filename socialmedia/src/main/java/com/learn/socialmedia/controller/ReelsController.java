package com.learn.socialmedia.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.learn.socialmedia.models.Reels;
import com.learn.socialmedia.models.User;
import com.learn.socialmedia.service.ReelsService;
import com.learn.socialmedia.service.UserService;

@RestController
public class ReelsController {

	@Autowired
	private ReelsService reelsService;
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/api/reels/create")
	public Reels createReels(@RequestBody Reels reels, @RequestHeader("Authorization") String jwt) {
		
		User regUser = userService.findUserByJwt(jwt);
		Reels createdReels = reelsService.createReel(reels, regUser);
		return createdReels;
	}
	
	@GetMapping("/api/reels")
	public List<Reels> findAllReels() {
		
		List<Reels> reels = reelsService.findAllReels();
		return reels;
	}
	
	@GetMapping("/api/reels/user/{userId}")
	public List<Reels> findUserReels(@PathVariable Integer userId) throws Exception {
		
		List<Reels> userReels = reelsService.findUserReels(userId);
		return userReels;
	}
}
