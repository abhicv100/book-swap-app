package com.bits.messageservice.Dao;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import com.bits.messageservice.Entity.MessageEntity;
import java.util.List;

@Repository
public interface MessageDao extends ListCrudRepository<MessageEntity, String> {

    List<MessageEntity> findByChannelIdAndTimeStampGreaterThan(String channelId, long after);

    @Query(value = "SELECT DISTINCT m.channelId FROM MessageEntity m WHERE m.senderId=?1 OR m.receiverId=?2")
    List<String> findDistinctChannelIdBySenderIdOrReceiverId(String senderId, String receiverId);
}
