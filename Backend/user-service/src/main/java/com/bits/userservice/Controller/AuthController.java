package com.bits.userservice.Controller;

import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.bits.userservice.Dao.UserDao;

import io.jsonwebtoken.Jwts;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@ResponseBody
public class AuthController {

    @Autowired
    SecretKey secretKey;

    @Autowired
    UserDao userDao;

    @PostMapping("/auth")
    public String authenticateUser() {
        var auth = (UsernamePasswordAuthenticationToken)SecurityContextHolder.getContext().getAuthentication();
        User user = (User)auth.getPrincipal();
        var maybeUser = userDao.findByEmailId(user.getUsername());
        var userEntity = maybeUser.get();
        return Jwts.builder()
                    .subject(user.getUsername())
                    .issuedAt(new Date(System.currentTimeMillis()))
                    .claim("userId", userEntity.getId())
                    .signWith(secretKey)
                    .compact();
    }
}
