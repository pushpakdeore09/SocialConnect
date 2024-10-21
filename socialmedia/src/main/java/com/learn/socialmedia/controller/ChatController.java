package com.learn.socialmedia.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.learn.socialmedia.models.Chat;
import com.learn.socialmedia.models.User;
import com.learn.socialmedia.request.ChatRequest;
import com.learn.socialmedia.service.ChatService;
import com.learn.socialmedia.service.UserService;

@RestController
public class ChatController {

	@Autowired
	private ChatService chatService;
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/api/chats")
	public Chat createChat(@RequestBody ChatRequest chatRequest, @RequestHeader("Authorization") String jwt) throws Exception {
		User regUser = userService.findUserByJwt(jwt);
		User user2 = userService.findUserById(chatRequest.getUserId());
		Chat chat = chatService.createChat(regUser, user2);
		return chat;
	}
	
	@GetMapping("/api/user/chats")
	public List<Chat> findUsersChat(@RequestHeader("Authorization") String jwt) {
		
		User user = userService.findUserByJwt(jwt);
		List<Chat> chats = chatService.findUsersChat(user.getUserId());
		return chats;
	}
}
