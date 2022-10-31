package com.quora.QuoraBackEnd.Service;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quora.QuoraBackEnd.Exceptions.QuestionNotFoundException;
import com.quora.QuoraBackEnd.Exceptions.UserNotFoundException;
import com.quora.QuoraBackEnd.Model.Question;
import com.quora.QuoraBackEnd.Model.User;
import com.quora.QuoraBackEnd.Repository.QuestionRepository;
import com.quora.QuoraBackEnd.Repository.UserRepository;


@Service
public class QuestionService {

	@Autowired
	private QuestionRepository questionRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	public Question findQuestionById(long id) {
		Question question = this.questionRepository.findById(id).get();
		return question;
	}
	
	public List<Question> getAll(){
		return this.questionRepository.findAll();
	}
	
	public Question addQuestion(Question question) {
		return this.questionRepository.save(question);
	}
	
	public void deleteQuestion(long id) throws QuestionNotFoundException {
		Question question = this.questionRepository.findById(id).get();
		if(question==null) {
			throw new QuestionNotFoundException("Question Not Found");
		}
		
		this.questionRepository.delete(question);
	}
	
	public void likeQuestionById(long id) throws QuestionNotFoundException {
		Question question = this.questionRepository.findById(id).get();
		if(question==null) {
			throw new QuestionNotFoundException("Question Not Found");
		}
		
		question.addLike();
		this.questionRepository.save(question);
	}
	
	public void unlikeQuestionById(long id) throws QuestionNotFoundException {
		Question question = this.questionRepository.findById(id).get();
		if(question==null) {
			throw new QuestionNotFoundException("Question Not Found");
		}
		
		question.addLike();
		this.questionRepository.save(question);
	}
	
	public Set<Question> getQuestionsOfUser(long id) throws UserNotFoundException{
		User user = this.userRepository.findById(id).get();
		if (user == null) {
			throw new UserNotFoundException("User Not Found");
		}
		
		return user.getQuestions();
	}
	
	public void lockQuestion(long id) throws QuestionNotFoundException {
		Question question = this.questionRepository.findById(id).get();
		if(question==null) {
			throw new QuestionNotFoundException("Question Not Found");
		}
		
		question.setIsAns(1);
		this.questionRepository.save(question);
		return;
	}
	
	public void unlockQuestion(long id) throws QuestionNotFoundException {
		Question question = this.questionRepository.findById(id).get();
		if(question==null) {
			throw new QuestionNotFoundException("Question Not Found");
		}
		
		question.setIsAns(0);
		this.questionRepository.save(question);
		return;
	}

	public Set<User> getLikesUsers(long id) throws QuestionNotFoundException {
		
		Question question = this.questionRepository.findById(id).get();
		if(question==null) {
			throw new QuestionNotFoundException("Question Not Found");
		}
		return question.getLikeBy();
	}
	
	public List<Question> searchByTitle(String title){
		return this.questionRepository.findByTitleContaining(title);
	}
	
}
