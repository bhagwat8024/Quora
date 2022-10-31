package com.quora.QuoraBackEnd.Model;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.annotation.Generated;
import javax.management.loading.PrivateClassLoader;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;

import net.bytebuddy.asm.Advice.This;

@Entity
public class Question implements Serializable{

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	 private Long id;
	
	@Column(columnDefinition = "TEXT") 
	private String title;
	
	@Column(columnDefinition="TEXT")
	private String description;
	private long isAns;
	private long likes;
	private long totalReplies;
	
	@JsonFormat(pattern="yyyy-MM-dd",shape=Shape.STRING)
	private String date;
	
	@OneToMany(mappedBy="question",fetch=FetchType.LAZY,cascade = CascadeType.ALL)
	@JsonIgnore
	private Set<Reply> replies = new HashSet<Reply>();
	
	@ManyToOne(fetch=FetchType.EAGER,cascade=CascadeType.MERGE)
	private Category category;
	
	@ManyToOne(fetch = FetchType.EAGER)
	private User user;
	
	@ManyToMany(mappedBy="likeQuestions",cascade = CascadeType.ALL)
	@JsonIgnore
	private Set<User> likeBy = new HashSet<User>();
	

	public Question() {
		super();
	}

	public Question(Long id, String title, String description, long isAns, long likes, long totalReplies, String date,
			Set<Reply> replies, User user) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
		this.isAns = isAns;
		this.likes = likes;
		this.totalReplies = totalReplies;
		this.date = date;
		this.replies = replies;
		this.user = user;
	}

	
	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public Set<User> getLikeBy() {
		return likeBy;
	}

	public void setLikeBy(Set<User> likeBy) {
		this.likeBy = likeBy;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public long getIsAns() {
		return isAns;
	}

	public void setIsAns(long isAns) {
		this.isAns = isAns;
	}

	public long getLikes() {
		return likes;
	}

	public void setLikes(long likes) {
		this.likes = likes;
	}

	public long getTotalReplies() {
		return totalReplies;
	}

	public void setTotalReplies(long totalReplies) {
		this.totalReplies = totalReplies;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public Set<Reply> getReplies() {
		return replies;
	}

	public void setReplies(Set<Reply> replies) {
		this.replies = replies;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
	public void addLike() {
		this.likes=this.likes+1;
	}
	
	public void removeLike() {
		this.likes=this.likes-1;
	}
	
	public void addReplyCount() {
		this.totalReplies++;
	}
	
}
