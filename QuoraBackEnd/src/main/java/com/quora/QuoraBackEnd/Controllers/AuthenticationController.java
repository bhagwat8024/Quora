package com.quora.QuoraBackEnd.Controllers;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quora.QuoraBackEnd.Exceptions.UserNotFoundException;
import com.quora.QuoraBackEnd.Model.SecurityToken;
import com.quora.QuoraBackEnd.Model.User;
import com.quora.QuoraBackEnd.Security.CustomUserDetailsService;
import com.quora.QuoraBackEnd.Security.JwtUtilHelper;

@RestController
@CrossOrigin("*")
@RequestMapping("/login")
public class AuthenticationController {
	@Autowired
	AuthenticationManager authenticationManager;
	
	@Autowired
	CustomUserDetailsService customUserDetailsService;
	
	@Autowired
	JwtUtilHelper jwtUtilHelper;
	
	@PostMapping("/")
	public ResponseEntity<?> AuthenticateUser(@RequestBody User user) throws UserNotFoundException{
		try{
			UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(user.getUsername(),user.getPassword());
			this.authenticationManager.authenticate(usernamePasswordAuthenticationToken);
			}
		catch (Exception e) {
			throw new UserNotFoundException("User Not Found..");
		}
		
		String tokenString = this.jwtUtilHelper.generateToken(user);
		
		return ResponseEntity.ok(new SecurityToken(tokenString));
	}
	
	@PostMapping("/current-user")
	public User getCurrentUser(Principal principal) {
		System.out.println("principal is"+principal);
		return (User) this.customUserDetailsService.loadUserByUsername(principal.getName());
	}

}
