import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/Model/Question';
import { CategoryApiService } from 'src/app/Service/category-api.service';
import { QuestionApiService } from 'src/app/Service/question-api.service';

@Component({
  selector: 'app-serach-page',
  templateUrl: './serach-page.component.html',
  styleUrls: ['./serach-page.component.css'],
})
export class SerachPageComponent implements OnInit {
  searchCategoryId: number;
  searchTitle: string;
  questionList: Question[];

  constructor(
    private activateRoute: ActivatedRoute,
    private questionApiService: QuestionApiService,
    private categoryApiService: CategoryApiService
  ) {
    this.getTitleFromPath();
  }

  ngOnInit(): void {}

  getTitleFromPath() {
    this.activateRoute.params.subscribe((params) => {
      this.searchCategoryId = params['category'];
      this.searchTitle = params['title'];

      if (this.searchTitle != undefined) {
        this.loadQuestionListByTitle();
      }
      if (this.searchCategoryId != undefined) {
        this.loadQuestionListByCategory();
      }
    });
  }

  loadQuestionListByTitle() {
    this.questionApiService
      .searchQuestions(this.searchTitle)
      .subscribe((res) => {
        console.log(res);
        this.questionList = res;
      });
  }

  loadQuestionListByCategory() {
    this.categoryApiService
      .getQuestionsByCategory(this.searchCategoryId)
      .subscribe((res) => {
        console.log(res);
        this.questionList = res;
      });
  }
}
