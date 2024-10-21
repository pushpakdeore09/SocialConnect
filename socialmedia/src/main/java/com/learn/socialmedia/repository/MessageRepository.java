package com.learn.socialmedia.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.learn.socialmedia.models.Message;

@Repository
public interface MessageRepository extends JpaRepository<Message, Integer> {

	public List<Message> findByChat_ChatId(Integer chatId);

}
