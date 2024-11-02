package com.learn.socialmedia.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.learn.socialmedia.models.Message;
import com.learn.socialmedia.models.User;
import com.learn.socialmedia.service.MessageService;
import com.learn.socialmedia.service.UserService;

@RestController
public class MessageController {

	@Autowired
	private MessageService messageService;
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/api/messages/chat/{chatId}")
	public Message createMessage(@RequestBody Message msgReq, @RequestHeader("Authorization") String jwt, @PathVariable Integer chatId) throws Exception {
		
		User user = userService.findUserByJwt(jwt);
		Message message = messageService.createMessage(user, chatId, msgReq);
		
		return message;
	}
	
	@GetMapping("/api/messages/chat/{chatId}")
	public List<Message> getChatMessages(@PathVariable Integer chatId) throws Exception {
		
		List<Message> messages = messageService.findChatsMessages(chatId);
	
		return messages;
	}
}
