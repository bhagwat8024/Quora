package com.quora.QuoraBackEnd.Exceptions;

public class UserNotFoundException extends Exception{
	  String message;
	  public UserNotFoundException(String str) {
	      this.message = str;
	   }
	   public String toString() {
	      return (this.message);
	   }
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	   
}
