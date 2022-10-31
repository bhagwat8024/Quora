package com.quora.QuoraBackEnd.Repository;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.FluentQuery.FetchableFluentQuery;

import org.springframework.stereotype.Repository;


import com.quora.QuoraBackEnd.Model.User;

@Repository
public interface UserRepository extends JpaRepository<User,Long>{

	public User findByUsername(String userName);
	
}
