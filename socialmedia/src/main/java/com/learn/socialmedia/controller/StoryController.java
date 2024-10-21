package com.learn.socialmedia.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.learn.socialmedia.models.Story;
import com.learn.socialmedia.models.User;
import com.learn.socialmedia.service.StoryService;
import com.learn.socialmedia.service.UserService;

@RestController
public class StoryController {

	@Autowired
	private StoryService storyService;
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/api/story")
	public Story createStory(@RequestBody Story story, @RequestHeader("Authorization") String jwt) {
		
		User regUser = userService.findUserByJwt(jwt);
		Story createStory = storyService.createStory(story, regUser);
		return createStory;
	}
	
	@GetMapping("/api/story/user/{userId}")
	public List<Story> findUserStory(@PathVariable Integer userId, @RequestHeader("Authorization") String jwt) throws Exception {
		
		User regUser = userService.findUserByJwt(jwt);
		List<Story> usersStory = storyService.findStoryByUserId(userId);
		return usersStory;
	}
}
