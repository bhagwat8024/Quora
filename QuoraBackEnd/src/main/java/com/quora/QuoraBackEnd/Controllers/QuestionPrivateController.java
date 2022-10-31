package com.quora.QuoraBackEnd.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quora.QuoraBackEnd.Exceptions.QuestionNotFoundException;
import com.quora.QuoraBackEnd.Model.Question;
import com.quora.QuoraBackEnd.Service.QuestionService;
import com.quora.QuoraBackEnd.Service.UserService;

@RestController
@CrossOrigin("*")
@RequestMapping("/privateQuestion")
public class QuestionPrivateController {

	@Autowired
	private QuestionService questionService;
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/add")
	public Question addQuestion(@RequestBody Question question) {
		System.out.println(question.getDescription());
		return questionService.addQuestion(question);
	}
	
	@PutMapping("/lockQuestion/{id}")
	public void lockQuestion(@PathVariable long id) throws QuestionNotFoundException {
		this.questionService.lockQuestion(id);
		return;
	}
	
	@PutMapping("/unlockQuestion/{id}")
	public void unLockQuestion(@PathVariable long id) throws QuestionNotFoundException {
		this.questionService.unlockQuestion(id);
		return;
	}
}
