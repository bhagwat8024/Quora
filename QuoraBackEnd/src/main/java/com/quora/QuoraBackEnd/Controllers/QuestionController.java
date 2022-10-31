package com.quora.QuoraBackEnd.Controllers;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quora.QuoraBackEnd.Exceptions.QuestionNotFoundException;
import com.quora.QuoraBackEnd.Exceptions.UserNotFoundException;
import com.quora.QuoraBackEnd.Model.Question;
import com.quora.QuoraBackEnd.Model.User;
import com.quora.QuoraBackEnd.Service.QuestionService;
import com.quora.QuoraBackEnd.Service.UserService;


@RestController
@RequestMapping("/question")
@CrossOrigin("*")
public class QuestionController {

	@Autowired
	private QuestionService questionService;
	
	@Autowired
	private UserService userService;
	
	
	
	@GetMapping("/getByQId/{id}")
	public Question getQuestion(@PathVariable long id) {
		return this.questionService.findQuestionById(id);
	}
	
	@GetMapping("/getQuestionOfUser/{id}")
	public Set<Question> getQuestionsOfUser(@PathVariable long id) throws UserNotFoundException{
		return this.questionService.getQuestionsOfUser(id);
	}
	
	@GetMapping("/getLikedUsers/{id}")
	public Set<User> getLikedUsers(@PathVariable long id) throws QuestionNotFoundException{
		return this.questionService.getLikesUsers(id);
	}
	
	
	
	@GetMapping("/getAllQuestions")
	public List<Question> getAllQuestion(){
		return this.questionService.getAll();
	}
	
	@GetMapping("/search/{title}")
	public List<Question> search(@PathVariable String title){
		return this.questionService.searchByTitle(title);
	}
	
}
