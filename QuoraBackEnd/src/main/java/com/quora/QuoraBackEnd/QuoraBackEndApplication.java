package com.quora.QuoraBackEnd;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.quora.QuoraBackEnd.Model.User;
import com.quora.QuoraBackEnd.Repository.UserRepository;

@SpringBootApplication
public class QuoraBackEndApplication{

	public static void main(String[] args) {
		SpringApplication.run(QuoraBackEndApplication.class, args);
	}
}
