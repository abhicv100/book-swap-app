package com.bits.userservice.Controller;

import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@ResponseBody
public class AuthController {

    @PostMapping("/auth")
    public String authenticateUser() {
        return "user authenticated";
    }
}
