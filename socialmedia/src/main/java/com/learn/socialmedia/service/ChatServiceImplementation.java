package com.learn.socialmedia.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.learn.socialmedia.models.Chat;
import com.learn.socialmedia.models.User;
import com.learn.socialmedia.repository.ChatRepository;

@Service
public class ChatServiceImplementation implements ChatService {

	@Autowired
	private ChatRepository chatRepository;
	@Override
	public Chat createChat(User user2, User regUser) {
		Chat isExist = chatRepository.findChatByUsersId(user2, regUser);
		if(isExist!=null) {
			return isExist;
		}
		
		Chat chat = new Chat();
		chat.getUsers().add(regUser);
		chat.getUsers().add(user2);
		chat.setTimeStamp(LocalDateTime.now());
		return chatRepository.save(chat);
	}

	@Override
	public Chat findChatById(Integer chatId) throws Exception {
		Optional<Chat> chat = chatRepository.findById(chatId);
		if(chat.isEmpty()) {
			throw new Exception("Chat not found with chatId: "+chatId);
		}
		return chat.get();
	}

	@Override
	public List<Chat> findUsersChat(Integer userId) {
		// TODO Auto-generated method stub
		return chatRepository.findByUsers_UserId(userId);
	}

}
