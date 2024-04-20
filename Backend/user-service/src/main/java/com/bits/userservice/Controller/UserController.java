package com.bits.userservice.Controller;

import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@ResponseBody
public class UserController {

    @PostMapping("/user")
    public String createUser(@RequestBody String entity) {        
        return entity;
    }

    @GetMapping("/user/{userId}")
    public String getAnyUserDetails(@PathVariable(required = true) String userId) {
        return userId;
    }
}
