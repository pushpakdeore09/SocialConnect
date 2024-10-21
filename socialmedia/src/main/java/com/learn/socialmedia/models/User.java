package com.learn.socialmedia.models;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

@Entity
@Table(name="users")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer userId;
	private String firstName;
	private String lastName;
	private String email;
	private String password;
	private String gender;

    private List<Integer> followers = new ArrayList<>();
    private List<Integer> followings = new ArrayList<>();
    @JsonIgnore
    @ManyToMany
    private List<Post> savedPosts = new ArrayList<>();

	public User(Integer userId, String firstName, String lastName, String email, String password, String gender,
			List<Integer> followers, List<Integer> followings, List<Post> savedPosts) {
		super();
		this.userId = userId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
		this.gender = gender;
		this.followers = followers;
		this.followings = followings;
		this.savedPosts = savedPosts;
	}

	public User() {
		// TODO Auto-generated constructor stub
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	
	public String getFirstName() {
		return firstName;
	}
	
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	
	public String getLastName() {
		return lastName;
	}
	
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	
	public String getEmail() {
		return email;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}
	
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}


	public String getGender() {
		return gender;
	}


	public void setGender(String gender) {
		this.gender = gender;
	}


	public List<Integer> getFollowers() {
		return followers;
	}


	public void setFollowers(List<Integer> followers) {
		this.followers = followers;
	}


	public List<Integer> getFollowings() {
		return followings;
	}


	public void setFollowings(List<Integer> followings) {
		this.followings = followings;
	}

	public List<Post> getSavedPosts() {
		return savedPosts;
	}

	public void setSavedPosts(List<Post> savedPosts) {
		this.savedPosts = savedPosts;
	}
	
	
	
}
