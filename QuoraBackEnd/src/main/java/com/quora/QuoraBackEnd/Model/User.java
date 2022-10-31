package com.quora.QuoraBackEnd.Model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.PreRemove;
import javax.persistence.PreUpdate;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.Proxy;
import org.hibernate.validator.constraints.UniqueElements;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import net.bytebuddy.asm.Advice.Return;
import net.bytebuddy.asm.Advice.This;

import com.fasterxml.jackson.annotation.JsonFormat.Shape;

@Entity
public class User implements UserDetails,Serializable{
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long id;
	
	@Column(unique = true)
	private String username;
	private String password;
	private String firstName;
	private String lastName;
	private String image;
	
	@Column(length = 3000) 
	private String about;

	@Column(unique = true)
	private String email;
	private String phone;

	private long followersCount;
	
	private long followingsCount;
	
	@JsonFormat(pattern="yyyy-MM-dd",shape=Shape.STRING)
	private String joiningDate;
	
	@OneToMany(mappedBy="user",fetch=FetchType.LAZY,cascade=CascadeType.ALL)
	@JsonIgnore
	private Set<Question> questions = new HashSet<Question>();
	
	@OneToMany(mappedBy="user",cascade=CascadeType.ALL)
	@JsonIgnore
	private Set<Reply> replies = new HashSet<Reply>();
	
	@ManyToMany
	@JoinTable(name="user_like_questions",
	joinColumns = @JoinColumn(name="user_id"),
	inverseJoinColumns = @JoinColumn(name="question_id"))
	@JsonIgnore
	private Set<Question> likeQuestions = new HashSet<Question>();
	
	@ManyToMany
	@JoinTable(name="following_followers",
	joinColumns = @JoinColumn(name="follower_id"),
	inverseJoinColumns = @JoinColumn(name="following_id"))
	@JsonIgnore
	private Set<User> followings = new HashSet<User>();
	
	@ManyToMany(mappedBy = "followings")
	@JsonIgnore
	private Set<User> followers = new HashSet<User>();
	
	public boolean addFollower(User follower) {
		this.followers.add(follower);
		follower.getFollowings().add(this);
		updateCountValue(follower);
		return true;
	}
	
	public boolean addFollowing(User following) {
		this.followings.add(following);
		following.getFollowers().add(this);
		updateCountValue(following);
		return true;
	}
	
	public boolean removeFollower(User follower) {
		this.followers.remove(follower);
		follower.getFollowings().remove(this);
		updateCountValue(follower);
		return true;
	}
	
	public void updateCountValue(User user) {
		this.followersCount = this.followers.size();
		this.followingsCount = this.followings.size();
		
		user.followersCount = user.followers.size();
		user.followingsCount = user.followings.size();
		return;
	}
	
	public String getAbout() {
		return about;
	}

	public void setAbout(String about) {
		this.about = about;
	}

	public boolean removeFollowing(User following) {
		this.followings.remove(following);
		following.getFollowers().remove(this);
		updateCountValue(following);
		return true;
	}
	
	public void likeQuestion(Question question) {
		this.likeQuestions.add(question);
		question.getLikeBy().add(this);
		question.addLike();
	}
	
	public void unlikeQuestion(Question question) {
		this.likeQuestions.remove(question);
		question.getLikeBy().remove(this);
		question.removeLike();
	}
	
	 @PreUpdate
	 public void onPreUpdate() {
		 System.out.println(this.followers.size());
	 }
	     
	
	public User() {
		super();
	}

	
	
	public Set<User> getFollowings() {
		return followings;
	}



	public void setFollowings(Set<User> followings) {
		this.followings = followings;
	}



	public Set<User> getFollowers() {
		return followers;
	}



	public void setFollowers(Set<User> followers) {
		this.followers = followers;
	}



	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public Set<Question> getQuestions() {
		return questions;
	}

	public void setQuestions(Set<Question> questions) {
		this.questions = questions;
	}

	public Set<Reply> getReplies() {
		return replies;
	}

	public void setReplies(Set<Reply> replies) {
		this.replies = replies;
	}

	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return super.toString();
	}

	public long getFollowersCount() {
		return followersCount;
	}

	public void setFollowersCount(long followersCount) {
		this.followersCount = followersCount;
	}

	public long getFollowingsCount() {
		return followingsCount;
	}

	public void setFollowingsCount(long followingsCount) {
		this.followingsCount = followingsCount;
	}


	public String getJoiningDate() {
		return joiningDate;
	}

	public void setJoiningDate(String joiningDate) {
		this.joiningDate = joiningDate;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	

	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public String getPhone() {
		return phone;
	}


	public void setPhone(String phone) {
		this.phone = phone;
	}

	public Set<Question> getLikeQuestions() {
		return likeQuestions;
	}

	public void setLikeQuestions(Set<Question> likeQuestions) {
		this.likeQuestions = likeQuestions;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return new ArrayList<GrantedAuthority>();
	}


	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}


	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}


	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}


	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}
	
	
}
