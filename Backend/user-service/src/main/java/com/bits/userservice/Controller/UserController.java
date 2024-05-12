package com.bits.userservice.Controller;

import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.bits.userservice.Dao.UserDao;
import com.bits.userservice.Entity.UserEntity;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@ResponseBody
public class UserController {

    @Autowired
    UserDao userDao;

    @Autowired
    PasswordEncoder passwordEncoder;

    @CrossOrigin
    @PostMapping("/user")
    public ResponseEntity<Map<String, Object>> createUser(@RequestBody UserEntity entity) {
        Map<String, Object> result = new HashMap<>();        
        try {
            String id = UUID.randomUUID().toString().replace("-", "");
            entity.setId(id);  
            String hashedPassword = passwordEncoder.encode(entity.getPassword());   
            entity.setPassword(hashedPassword);
            userDao.save(entity);    
            result.put("data", id);
            result.put("status", "success");
            return ResponseEntity.ok(result);
        } catch(DataIntegrityViolationException e) {
            result.put("status", "failed");
            result.put("error_msg", String.format("user with email id: '%s' already exist", entity.getEmailId()));
            return ResponseEntity.badRequest().body(result);
        } catch(Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @CrossOrigin
    @GetMapping("/user/{userId}")
    public ResponseEntity<Map<String, Object>> getAnyUserDetails(@PathVariable(required = true) String userId) {
        try {
            Map<String, Object> result = new HashMap<>();

            var maybeUser = userDao.findById(userId);
    
            if(maybeUser.isPresent()) {
                var user = maybeUser.get();
                user.setPassword("[REDACTED]");
                result.put("data", user);
                result.put("status", "success");
                return ResponseEntity.ok().body(result);
            } else {
                result.put("status", "failed");
                result.put("error_msg", String.format("user with id: '%s' does not exist", userId));
                return ResponseEntity.badRequest().body(result);
            }
        } catch(Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
