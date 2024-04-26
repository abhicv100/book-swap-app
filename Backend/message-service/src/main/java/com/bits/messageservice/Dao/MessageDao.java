package com.bits.messageservice.Dao;

import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import com.bits.messageservice.Entity.MessageEntity;
import java.util.List;

@Repository
public interface MessageDao extends ListCrudRepository<MessageEntity, String> {
    List<MessageEntity> findByChannelId(String channelId);
    List<MessageEntity> findBySenderIdOrReceiverId(String senderId, String receiverId);
}
