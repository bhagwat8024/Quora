package com.quora.QuoraBackEnd.Model;

public class SecurityToken {
	String token;
	
	public SecurityToken() {
		// TODO Auto-generated constructor stub
	}
	
	public SecurityToken(String token) {
		super();
		this.token = token;
	}

	public void setToken(String token) {
		this.token = token;
	}
	public String getToken() {
		return token;
	}
}
