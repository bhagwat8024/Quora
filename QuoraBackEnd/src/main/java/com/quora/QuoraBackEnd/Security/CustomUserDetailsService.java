package com.quora.QuoraBackEnd.Security;

import com.quora.QuoraBackEnd.Model.User;
import com.quora.QuoraBackEnd.Service.UserService;

import net.bytebuddy.asm.Advice.Return;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService{
	
	@Autowired
	private UserService userService;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		User user = this.userService.getUserByUserName(username);
		
		if(user!=null) {
			return user;
		}
		else {
			throw new UsernameNotFoundException("Username not Found");
		}
		
	}

}
