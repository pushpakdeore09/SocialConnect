package com.learn.socialmedia.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Reels {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer reelId;
	private String title;
	private String video;
	@ManyToOne
	private User user;
	
	public Reels() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Reels(Integer reelId, String title, String video, User user) {
		super();
		this.reelId = reelId;
		this.title = title;
		this.video = video;
		this.user = user;
	}

	public Integer getReelId() {
		return reelId;
	}

	public void setReelId(Integer reelId) {
		this.reelId = reelId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getVideo() {
		return video;
	}

	public void setVideo(String video) {
		this.video = video;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
	
}
