package com.learn.socialmedia.models;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Story {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer storyId;
	@ManyToOne
	private User user;
	private String image;
	private String caption;
	private LocalDateTime timeStamp;
	
	public Story() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Story(Integer storyId, User user, String image, String caption, LocalDateTime timeStamp) {
		super();
		this.storyId = storyId;
		this.user = user;
		this.image = image;
		this.caption = caption;
		this.timeStamp = timeStamp;
	}

	public Integer getStoryId() {
		return storyId;
	}

	public void setStoryId(Integer storyId) {
		this.storyId = storyId;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getCaption() {
		return caption;
	}

	public void setCaption(String caption) {
		this.caption = caption;
	}

	public LocalDateTime getTimeStamp() {
		return timeStamp;
	}

	public void setTimeStamp(LocalDateTime timeStamp) {
		this.timeStamp = timeStamp;
	}
	
	
}

