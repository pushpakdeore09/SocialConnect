package com.learn.socialmedia.models;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Message {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer messageId;
	private String content;
	private String image;
	@ManyToOne
	private User user;
	@JsonIgnore
	@ManyToOne
	private Chat chat;
	private LocalDateTime timeStamp;
	
	public Message() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Message(Integer messageId, String content, String image, User user, Chat chat, LocalDateTime timeStamp) {
		super();
		this.messageId = messageId;
		this.content = content;
		this.image = image;
		this.user = user;
		this.chat = chat;
		this.timeStamp = timeStamp;
	}

	public Integer getMessageId() {
		return messageId;
	}

	public void setMessageId(Integer messageId) {
		this.messageId = messageId;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Chat getChat() {
		return chat;
	}

	public void setChat(Chat chat) {
		this.chat = chat;
	}

	public LocalDateTime getTimeStamp() {
		return timeStamp;
	}

	public void setTimeStamp(LocalDateTime timeStamp) {
		this.timeStamp = timeStamp;
	}
}
