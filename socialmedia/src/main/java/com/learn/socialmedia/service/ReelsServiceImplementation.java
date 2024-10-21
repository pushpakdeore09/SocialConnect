package com.learn.socialmedia.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.learn.socialmedia.models.Reels;
import com.learn.socialmedia.models.User;
import com.learn.socialmedia.repository.ReelsRepository;

@Service
public class ReelsServiceImplementation implements ReelsService {

	@Autowired
	private ReelsRepository reelsRepository;
	
	@Autowired
	private UserService userService;
	@Override
	public Reels createReel(Reels reels, User user) {
		
		Reels createReel = new Reels();
		createReel.setTitle(reels.getTitle());
		createReel.setUser(user);
		createReel.setVideo(reels.getVideo());
		return reelsRepository.save(createReel);
	}

	@Override
	public List<Reels> findAllReels() {
		// TODO Auto-generated method stub
		return reelsRepository.findAll();
	}

	@Override
	public List<Reels> findUserReels(Integer userId) throws Exception {
		userService.findUserById(userId);
		
		return reelsRepository.findByUser_UserId(userId);
	}

}
