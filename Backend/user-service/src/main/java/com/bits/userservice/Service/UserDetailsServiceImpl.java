package com.bits.userservice.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.bits.userservice.Dao.UserDao;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    UserDao userDao;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        var maybeUser = userDao.findByEmailId(username);

        if(maybeUser.isPresent()) {
            var user = maybeUser.get();
            return User.builder().username(user.getEmailId()).password(user.getPassword()).build();
        }

        throw new UsernameNotFoundException(String.format("user with email id '%s' does not exist", username));        
    }
}
