package com.bits.userservice.Controller;

import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.bits.userservice.Dao.UserDao;
import com.bits.userservice.Entity.UserEntity;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@ResponseBody
public class UserController {

    @Autowired
    UserDao userDao;

    @Autowired
    PasswordEncoder passwordEncoder;

    @PostMapping("/user")
    public String createUser(@RequestBody UserEntity entity) {
        String id = UUID.randomUUID().toString().replace("-", "");
        entity.setId(id);  
        String hashedPassword = passwordEncoder.encode(entity.getPassword());   
        entity.setPassword(hashedPassword);
        userDao.save(entity);
        return id;
    }

    @GetMapping("/user/{userId}")
    public UserEntity getAnyUserDetails(@PathVariable(required = true) String userId) {

        var maybeUser = userDao.findById(userId);

        if(maybeUser.isPresent()) {
            var user = maybeUser.get();
            user.setPassword("[REDACTED]");
            return user;
        }

        return new UserEntity();
    }
}
