package com.quora.QuoraBackEnd.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.quora.QuoraBackEnd.Model.Question;

@Repository
public interface QuestionRepository extends JpaRepository<Question,Long> {
	public List<Question> findByTitleContaining(String title);
}
