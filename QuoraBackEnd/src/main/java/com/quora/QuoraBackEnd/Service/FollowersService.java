package com.quora.QuoraBackEnd.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quora.QuoraBackEnd.Model.User;
import com.quora.QuoraBackEnd.Repository.UserRepository;

@Service
public class FollowersService {
	
	@Autowired 
	private UserRepository userRepository;
	
	public boolean follow(long followerId,long followingId) {
		User followingUser = this.userRepository.findById(followingId).get();
		User followerUser = this.userRepository.findById(followerId).get();
		
		if(followingUser==null || followerUser==null)return false;
		
		followerUser.addFollowing(followingUser);
		
		this.userRepository.save(followingUser);
		this.userRepository.save(followerUser);
		
		return true;
	}
	
	public boolean unFollow(long followingId,long followerId) {
		User followingUser = this.userRepository.findById(followingId).get();
		User followerUser = this.userRepository.findById(followerId).get();
		
		if(followingUser==null || followerUser==null)return false;
		
		followingUser.removeFollower(followerUser);
		
		this.userRepository.save(followingUser);
		this.userRepository.save(followerUser);
		
		return true;
	}
	
}
