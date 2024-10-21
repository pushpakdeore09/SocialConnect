package com.learn.socialmedia.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.learn.socialmedia.models.Chat;
import com.learn.socialmedia.models.User;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Integer>{

	public List<Chat> findByUsers_UserId(Integer userId);

	@Query("select c from Chat c Where :user Member of c.users And :regUser Member of c.users")
	public Chat findChatByUsersId(@Param("user") User user, @Param("regUser") User regUser);

}
