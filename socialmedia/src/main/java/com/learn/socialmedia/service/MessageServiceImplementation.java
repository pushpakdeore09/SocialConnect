package com.learn.socialmedia.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.learn.socialmedia.models.Chat;
import com.learn.socialmedia.models.Message;
import com.learn.socialmedia.models.User;
import com.learn.socialmedia.repository.MessageRepository;

@Service
public class MessageServiceImplementation implements MessageService {

	@Autowired
	private MessageRepository messageRepository;
	
	@Autowired
	private ChatService chatService;
	
	@Override
	public Message createMessage(User user, Integer chatId, Message msgReq) throws Exception {
		Message message = new Message();
		Chat chat = chatService.findChatById(chatId);
		message.setChat(chat);
		message.setContent(msgReq.getContent());
		message.setImage(msgReq.getImage());
		message.setUser(user);
		message.setTimeStamp(LocalDateTime.now());
		Message savedMessage = messageRepository.save(message);
		chat.getMessages().add(savedMessage);
		return savedMessage;
	}

	@Override
	public List<Message> findChatsMessages(Integer chatId) throws Exception {
		Chat chat = chatService.findChatById(chatId);
		return messageRepository.findByChat_ChatId(chatId);
	}

}
