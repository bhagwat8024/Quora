package com.quora.QuoraBackEnd.Exceptions;

public class QuestionNotFoundException extends Exception{
	String message;
	
	public QuestionNotFoundException(String msg) {
		this.message=msg;
	}

	@Override
	public String toString() {
		return this.message;
	}
	
}
