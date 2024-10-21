package com.learn.socialmedia.models;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;

@Entity
public class Chat {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer chatId;
	
	private String chatName;
	private String chatImage;
	@ManyToMany
	private List<User> users = new ArrayList<>();
	@OneToMany(mappedBy = "chat")
	private List<Message> messages = new ArrayList<>();
	private LocalDateTime timeStamp;
	
	public Chat() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Chat(Integer chatId, String chatName, String chatImage, List<User> users, List<Message> messages, LocalDateTime timeStamp) {
		super();
		this.chatId = chatId;
		this.chatName = chatName;
		this.chatImage = chatImage;
		this.users = users;
		this.messages = messages;
		this.timeStamp = timeStamp;
	}

	public Integer getChatId() {
		return chatId;
	}

	public void setChatId(Integer chatId) {
		this.chatId = chatId;
	}

	public String getChatName() {
		return chatName;
	}

	public void setChatName(String chatName) {
		this.chatName = chatName;
	}

	public String getChatImage() {
		return chatImage;
	}

	public void setChatImage(String chatImage) {
		this.chatImage = chatImage;
	}

	public List<User> getUsers() {
		return users;
	}

	public void setUsers(List<User> users) {
		this.users = users;
	}

	
	public List<Message> getMessages() {
		return messages;
	}

	public void setMessages(List<Message> messages) {
		this.messages = messages;
	}

	public LocalDateTime getTimeStamp() {
		return timeStamp;
	}

	public void setTimeStamp(LocalDateTime timeStamp) {
		this.timeStamp = timeStamp;
	}		
}
