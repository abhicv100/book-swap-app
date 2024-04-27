package com.bits.messageservice.Controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.bits.messageservice.Dao.MessageDao;
import com.bits.messageservice.Entity.MessageEntity;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
public class MessageController {

    @Autowired
    MessageDao messageDao;

    Logger logger = LoggerFactory.getLogger(MessageController.class);

    String getMessageChannelId(String fromUid, String toUid) {
        String channelId;

        if (fromUid.compareTo(toUid) < 0) {
            channelId = fromUid + toUid;
        } else {
            channelId = toUid + fromUid;
        }

        return channelId;
    }

    @PostMapping("/messages")
    public ResponseEntity<Map<String, Object>> sendMessage(@RequestBody MessageEntity message) {

        logger.info("Message send from '{}' to '{}'", message.getSenderId(), message.getReceiverId());

        Map<String, Object> result = new HashMap<>();
        try {
            String messageId = UUID.randomUUID().toString().replace("-", "");
            message.setId(messageId);
    
            String channelId = getMessageChannelId(message.getSenderId(), message.getReceiverId());
            message.setChannelId(channelId);
    
            messageDao.save(message);
    
            result.put("data", messageId);
            result.put("status", "success");

            return ResponseEntity.ok().body(result);
        } catch(Exception e) {
            logger.error("error: {}", e.getMessage());
            result.put("error_msg", "failed to sent message");
            result.put("status", "fail");
            return ResponseEntity.internalServerError().body(result);
        }
    }

    // NOTE: for polling new messages from UI
    // TODO: accept list of channel id and search after timestamp
    @GetMapping("/messages/channel/{channelId}")
    public ResponseEntity<Map<String, Object>> getMessages(@PathVariable String channelId, @RequestParam(name="after", defaultValue="0") long after) {
        
        logger.info("fetching message list for chat channel '{}'' after time '{}'", channelId, after);
        
        Map<String, Object> result = new HashMap<>();

        try {
            var messages = messageDao.findByChannelIdAndTimeStampGreaterThan(channelId, after);
            result.put("data", messages);
            result.put("status", "success");   
            return ResponseEntity.ok().body(result);
        } catch(Exception e) {
            logger.error("error: {}", e.getMessage());
            result.put("error_msg", "failed to get messages");
            result.put("status", "fail");
            return ResponseEntity.internalServerError().body(result);
        }
    }

    @GetMapping("/messages/user/{userId}")
    public ResponseEntity<Map<String, Object>> getChannelIdsForUser(@PathVariable String userId) {

        logger.info("fetching channel ids for user '{}'", userId);

        Map<String, Object> result = new HashMap<>();

        try {
            List<String> channelIds = messageDao.findDistinctChannelIdBySenderIdOrReceiverId(userId, userId);

            // channelIds.forEach((id) -> {
            //     String othersId = id.replace(userId, "");
            //     System.out.println(othersId);
            // });

            result.put("data", channelIds);
            result.put("status", "success");
            return ResponseEntity.ok().body(result);
        } catch(Exception e) {
            logger.error("error: {}", e.getMessage());
            result.put("error_msg", "failed to get messages");
            result.put("status", "fail");
            return ResponseEntity.internalServerError().body(result);
        }
    }
}
