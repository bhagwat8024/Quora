package com.quora.QuoraBackEnd.Controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.quora.QuoraBackEnd.Exceptions.QuestionNotFoundException;
import com.quora.QuoraBackEnd.Exceptions.UserNotFoundException;
import com.quora.QuoraBackEnd.Model.ApiError;

@ControllerAdvice
public class ErrorController extends ResponseEntityExceptionHandler{

  @ExceptionHandler(UserNotFoundException.class)   
  public ResponseEntity<?> handleUserNotFoundExceptions(UserNotFoundException ex){
	ResponseEntity responseEntity = new ResponseEntity<>(new ApiError(ex.getMessage()), HttpStatus.CONFLICT);
    return responseEntity;
   }
  
  @ExceptionHandler(QuestionNotFoundException.class)   
  public ResponseEntity<?> handleQuestionNotFoundExceptions(QuestionNotFoundException ex){
	ResponseEntity responseEntity = new ResponseEntity<>(new ApiError(ex.getMessage()), HttpStatus.CONFLICT);
    return responseEntity;
   }
  }
