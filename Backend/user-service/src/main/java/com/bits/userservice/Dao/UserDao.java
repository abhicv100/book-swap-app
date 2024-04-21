package com.bits.userservice.Dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bits.userservice.Entity.UserEntity;
import java.util.Optional;

@Repository
public interface UserDao extends CrudRepository<UserEntity, String> {
    Optional<UserEntity> findByEmailId(String emailId);
}
