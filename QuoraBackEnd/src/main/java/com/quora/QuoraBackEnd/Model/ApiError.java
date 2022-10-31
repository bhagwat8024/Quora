package com.quora.QuoraBackEnd.Model;

public class ApiError {
	String message;

	public ApiError(String message) {
		super();
		this.message = message;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}
