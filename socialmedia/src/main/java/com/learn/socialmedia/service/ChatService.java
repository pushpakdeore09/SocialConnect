package com.learn.socialmedia.service;

import java.util.List;

import com.learn.socialmedia.models.Chat;
import com.learn.socialmedia.models.User;

public interface ChatService {

	public Chat createChat(User regUser, User user2);	
	
	public Chat findChatById(Integer chatId) throws Exception;
	
	public List<Chat> findUsersChat(Integer userId);
}
