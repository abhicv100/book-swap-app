package com.bits.userservice.Controller;

import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.bits.userservice.Dao.UserDao;

import io.jsonwebtoken.Jwts;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@ResponseBody
public class AuthController {

    @Autowired
    SecretKey secretKey;

    @Autowired
    UserDao userDao;

    @CrossOrigin
    @PostMapping("/auth")
    public ResponseEntity<Map<String, Object>> authenticateUser() {
        Map<String, Object> result = new HashMap<>();
        try {
            var auth = (UsernamePasswordAuthenticationToken)SecurityContextHolder.getContext().getAuthentication();
            User user = (User)auth.getPrincipal();
            var maybeUser = userDao.findByEmailId(user.getUsername());
            var userEntity = maybeUser.get();
            String token = Jwts.builder()
                            .subject(user.getUsername())
                            .issuedAt(new Date(System.currentTimeMillis()))
                            .claim("userId", userEntity.getId())
                            .signWith(secretKey)
                            .compact();
            result.put("data", token);
            result.put("status", "success");
            return ResponseEntity.ok(result);
        } catch(Exception e) {
            result.put("status", "failed");
            result.put("error_msg", "internal server error: please contact administrators");
            return ResponseEntity.internalServerError().body(result);
        }
    }
}
