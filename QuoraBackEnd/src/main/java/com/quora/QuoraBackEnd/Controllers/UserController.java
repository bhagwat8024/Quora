package com.quora.QuoraBackEnd.Controllers;

import java.util.*;

import javax.persistence.Id;
import javax.print.event.PrintJobAttributeEvent;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.support.Repositories;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quora.QuoraBackEnd.Model.SecurityToken;
import com.quora.QuoraBackEnd.Model.User;
import com.quora.QuoraBackEnd.Security.JwtUtilHelper;
import com.quora.QuoraBackEnd.Service.UserService;
import com.quora.QuoraBackEnd.Exceptions.UserNotFoundException;


@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	AuthenticationManager authenticationManager;
	
	@Autowired
	private JwtUtilHelper jwtUtilHelper;
	
	@PostMapping("/")
	public ResponseEntity<?> registerUser(@RequestBody User user){
		user = userService.registerUser(user);
		return ResponseEntity.ok(user);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> findById(@PathVariable long id) throws Exception{
		return ResponseEntity.ok(this.userService.getUserById(id));
	}
	
	@GetMapping("/getFollowers/{userName}")
	public Set<User> getFollowers(@PathVariable String userName) throws UserNotFoundException{
		
		Set<User> list = this.userService.getFollowers(userName);
		return list;
	}
	
	@GetMapping("/getFollowings/{userName}")
	public Set<User> getFollowings(@PathVariable String userName) throws UserNotFoundException{
		Set<User> list = this.userService.getFollowings(userName);
		return list;
	}
	
	
}
