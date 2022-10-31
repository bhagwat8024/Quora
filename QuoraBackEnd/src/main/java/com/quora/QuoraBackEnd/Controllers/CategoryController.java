package com.quora.QuoraBackEnd.Controllers;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quora.QuoraBackEnd.Model.Category;
import com.quora.QuoraBackEnd.Model.Question;
import com.quora.QuoraBackEnd.Service.CategoryService;


@RestController
@RequestMapping("/category")
@CrossOrigin("*")
public class CategoryController {
	
	@Autowired
	private CategoryService categoryService;
	
	@PostMapping("/add")
	public Category addCategory(@RequestBody Category category) {
		return categoryService.addCategory(category);
	}
	
	@GetMapping("/getAll")
	public List<Category> getAll(){
		System.out.println("call ja rhi he");
		return categoryService.getAll();
	}
	
	@GetMapping("/getQuestionByCategory/{cid}")
	public Set<Question> getQuestionByCategory(@PathVariable long cid){
		return this.categoryService.getAllQuestionsByCategory(cid);
	}
	
}
