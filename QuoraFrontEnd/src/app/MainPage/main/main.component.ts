import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/Model/Category';
import { Question } from 'src/app/Model/Question';
import { CategoryApiService } from 'src/app/Service/category-api.service';
import { LoginUserApiService } from 'src/app/Service/login-user-api.service';
import { QuestionApiService } from 'src/app/Service/question-api.service';
import { UserApiService } from 'src/app/Service/user-api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  categoryList: Category[];
  questionList: Question[];

  constructor(
    private categoryService: CategoryApiService,
    private questionService: QuestionApiService
  ) {
    this.getAllCategories();
    this.getAllQuestions();
  }

  ngOnInit(): void {}

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe((res) => {
      this.categoryList = res;
    });
  }
  getAllQuestions() {
    this.questionService.getAllQuestions().subscribe((res) => {
      this.questionList = res;
    });
  }
}
