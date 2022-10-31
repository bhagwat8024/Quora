package com.quora.QuoraBackEnd.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quora.QuoraBackEnd.Model.Category;
import com.quora.QuoraBackEnd.Model.Question;
import com.quora.QuoraBackEnd.Repository.CategoryRepository;

import java.util.*;

@Service
public class CategoryService {
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	public Category addCategory(Category category) {
		category = this.categoryRepository.save(category);
		return category;
	}
	
	public List<Category> getAll(){
		return this.categoryRepository.findAll();
	}
	
	public Set<Question> getAllQuestionsByCategory(long id){
		Category category = this.categoryRepository.findById(id).get();
		
		return category.getQuestions();
		
	}

}
