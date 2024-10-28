package com.learn.socialmedia.controller;

import com.learn.socialmedia.models.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;

public class RealTimeChatController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/chat/{groupId}")
    public Message sendToUser(@Payload Message message,
                              @DestinationVariable String groupId){
        simpMessagingTemplate.convertAndSendToUser(groupId, "/private", message);

        return message;

    }
}
