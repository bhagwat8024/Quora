package com.quora.QuoraBackEnd.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quora.QuoraBackEnd.Exceptions.QuestionNotFoundException;
import com.quora.QuoraBackEnd.Exceptions.UserNotFoundException;
import com.quora.QuoraBackEnd.Model.Question;
import com.quora.QuoraBackEnd.Model.User;
import com.quora.QuoraBackEnd.Repository.UserRepository;
import java.util.List;
import java.util.Set;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private QuestionService questionService;

	public User registerUser(User user) {
		return this.userRepository.save(user);
	}

	public User getUserById(long id) {
		
		return this.userRepository.findById(id).get();
	}

	public User getUserByUserName(String userName) {
		return this.userRepository.findByUsername(userName);
	}

	public User updateFirstName(long id, String firstName) {
		User user = this.userRepository.findById(id).get();
		user.setFirstName(firstName);
		this.userRepository.save(user);
		return user;
	}
	
	public User updateAbout(long id, String about) {
		System.out.println(about);
		User user = this.userRepository.findById(id).get();
		user.setAbout(about);
		this.userRepository.save(user);
		return user;
	}


	public User updateLastName(long id, String lastName) {
		User user = this.userRepository.findById(id).get();
		user.setLastName(lastName);
		this.userRepository.save(user);
		return user;
	}

	public void deleteUser(User user) {
		this.userRepository.delete(user);
	}

	public Set<User> getFollowers(String userName) throws UserNotFoundException {
		User user = getUserByUserName(userName);

		if (user == null) {
			throw new UserNotFoundException("User Not Found");
		}

		return user.getFollowers();
	}

	public Set<User> getFollowings(String userName) throws UserNotFoundException {
		User user = getUserByUserName(userName);

		if (user == null) {
			throw new UserNotFoundException("User Not Found");
		}

		return user.getFollowings();
	}

	public void likeQuestion(long userId, long qid) throws UserNotFoundException, QuestionNotFoundException {
		User user = getUserById(userId);

		if (user == null) {
			throw new UserNotFoundException("User Not Found");
		}
		
		Question question = this.questionService.findQuestionById(qid);
		if(question==null) {
			throw new QuestionNotFoundException("Question Not Found");
		}
		
		if(user.getLikeQuestions().contains(question)) {
			return;
		}

		user.likeQuestion(question);
		this.userRepository.save(user);
		return;
	}
	
	public void unlikeQuestion(long userId, long qid) throws UserNotFoundException, QuestionNotFoundException {
		User user = getUserById(userId);

		if (user == null) {
			throw new UserNotFoundException("User Not Found");
		}
		
		Question question = this.questionService.findQuestionById(qid);
		if(question==null) {
			throw new QuestionNotFoundException("Question Not Found");
		}
		
		if(!user.getLikeQuestions().contains(question)) {
			return;
		}

		user.unlikeQuestion(question);
		this.userRepository.save(user);
		return;
	}
	
	public Set<Question> getAllLikesQuestions(long userId) throws UserNotFoundException{
		User user = getUserById(userId);

		if (user == null) {
			throw new UserNotFoundException("User Not Found");
		}
		
		return user.getLikeQuestions();
	}

}
