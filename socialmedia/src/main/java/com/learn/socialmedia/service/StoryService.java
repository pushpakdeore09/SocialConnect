package com.learn.socialmedia.service;

import java.util.List;

import com.learn.socialmedia.models.Story;
import com.learn.socialmedia.models.User;

public interface StoryService {

	public Story createStory(Story story, User user);
	
	public List<Story> findStoryByUserId(Integer userId) throws Exception;
}
