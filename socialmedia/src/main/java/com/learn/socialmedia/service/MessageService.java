package com.learn.socialmedia.service;

import java.util.List;

import com.learn.socialmedia.models.Message;
import com.learn.socialmedia.models.User;

public interface MessageService {

	public Message createMessage(User user, Integer chatId, Message msgReq) throws Exception;
	
	public List<Message> findChatsMessages(Integer chatId) throws Exception;
}
