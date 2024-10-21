package com.learn.socialmedia.service;

import java.util.List;

import com.learn.socialmedia.models.Reels;
import com.learn.socialmedia.models.User;

public interface ReelsService {

	public Reels createReel(Reels reels, User user);
	
	public List<Reels> findAllReels();
	
	public List<Reels> findUserReels(Integer userId) throws Exception;
}
