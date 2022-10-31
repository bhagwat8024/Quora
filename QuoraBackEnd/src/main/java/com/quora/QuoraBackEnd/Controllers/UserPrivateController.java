package com.quora.QuoraBackEnd.Controllers;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quora.QuoraBackEnd.Exceptions.QuestionNotFoundException;
import com.quora.QuoraBackEnd.Exceptions.UserNotFoundException;
import com.quora.QuoraBackEnd.Model.Question;
import com.quora.QuoraBackEnd.Model.User;
import com.quora.QuoraBackEnd.Service.FollowersService;
import com.quora.QuoraBackEnd.Service.UserService;

@RestController
@RequestMapping("/loginUser")
@CrossOrigin("*")
public class UserPrivateController {

	@Autowired
	private FollowersService followersService;
	
	@Autowired
	private UserService userService;
	
	
	@PutMapping("/updateFirstName/{id}/{firstName}")
	public ResponseEntity<?> updateFirstName(@PathVariable long id,@PathVariable String firstName){
		User user = this.userService.updateFirstName(id, firstName);
		return ResponseEntity.ok(user);
	}
	
	@PutMapping("/updateLastName/{id}/{lastName}")
	public ResponseEntity<?> updateLastName(@PathVariable long id,@PathVariable String lastName){
		User user = this.userService.updateLastName(id, lastName);
		return ResponseEntity.ok(user);
	}
	
	@PutMapping("/updateAbout/{id}/{about}")
	public ResponseEntity<?> updateAbout(@PathVariable long id,@PathVariable String about){
		System.out.println(about);
		User user = this.userService.updateAbout(id, about);
		return ResponseEntity.ok(user);
	}

	@PutMapping("/follow/{followerId}/{followingId}")
	public boolean follow(@PathVariable long followerId,@PathVariable long followingId) {
		return this.followersService.follow(followerId, followingId);
	}
	
	@PutMapping("/unfollow/{followerId}/{followingId}")
	public boolean unFollow(@PathVariable long followerId,@PathVariable long followingId) {
		return this.followersService.unFollow(followingId, followerId);
	}
	
	@PutMapping("/like/{userId}/{qid}")
	public void like(@PathVariable long userId,@PathVariable long qid) throws UserNotFoundException, QuestionNotFoundException {
		this.userService.likeQuestion(userId, qid);
	}
	
	@PutMapping("/unlike/{userId}/{qid}")
	public void unlike(@PathVariable long userId,@PathVariable long qid) throws UserNotFoundException, QuestionNotFoundException {
		this.userService.unlikeQuestion(userId, qid);
	}
	
	@GetMapping("/allLikeQuestions/{userId}")
	public Set<Question> getAllLikeQuestions(@PathVariable long userId) throws UserNotFoundException{
		return this.userService.getAllLikesQuestions(userId);
	}
	
	@DeleteMapping("/{id}")
	public boolean deleteUser(@PathVariable long id) {
		User user = this.userService.getUserById(id);
		if(user==null)return false;
		this.userService.deleteUser(user);
		return true;
	}
	
}
