package com.bits.messageservice.Controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.bits.messageservice.Dao.MessageDao;
import com.bits.messageservice.Entity.MessageEntity;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@ResponseBody
public class MessageController {

    @Autowired
    MessageDao messageDao;

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
    public Map<String, Object> sendMessage(@RequestBody MessageEntity message) {
        Map<String, Object> result = new HashMap<>();
        
        String messageId = UUID.randomUUID().toString().replace("-", "");
        message.setId(messageId);

        String channelId = getMessageChannelId(message.getSenderId(), message.getReceiverId());
        message.setChannelId(channelId);

        messageDao.save(message);

        result.put("data", messageId);
        result.put("status", "success");
        return result;
    }

    // NOTE: for polling for new messages from frontend
    // TODO: accept list of channel id and serach after timestamp
    @GetMapping("/messages/channel/{channelId}")
    public Map<String, Object> getMessages(@PathVariable String channelId, @RequestParam(name="after", defaultValue="0") String after) {
        
        Map<String, Object> result = new HashMap<>();

        long searchAfterTimeStamp = Long.parseLong(after);

        var messages = messageDao.findByChannelId(channelId);

        result.put("data", messages);
        result.put("status", "success");
        
        return result;
    }

    @GetMapping("/messages/user/{userId}")
    public Map<String, Object> getChannelIdsForUser(@PathVariable String userId) {
        Map<String, Object> result = new HashMap<>();
        List<MessageEntity> messages = messageDao.findBySenderIdOrReceiverId(userId, userId);
        result.put("data", messages);
        result.put("status", "success");
        return result;
    }
}
