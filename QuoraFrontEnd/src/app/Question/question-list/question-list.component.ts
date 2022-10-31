import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Category } from 'src/app/Model/Category';
import { Question } from 'src/app/Model/Question';
import { CategoryApiService } from 'src/app/Service/category-api.service';
import { LoginUserApiService } from 'src/app/Service/login-user-api.service';
import { QuestionApiService } from 'src/app/Service/question-api.service';
import { UserApiService } from 'src/app/Service/user-api.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css'],
})
export class QuestionListComponent implements OnInit, OnChanges {
  @Input() questionList: Question[];
  categoryList: Category[];
  filterQuestionList: Question[];
  likedQuestionId: number[] = [];
  isEmpty: boolean = true;

  num: number;
  constructor(
    private categoryService: CategoryApiService,
    private questionService: QuestionApiService,
    private loginUserService: LoginUserApiService,
    private userService: UserApiService
  ) {
    this.getAllCategories();
    this.getLikesQuestion();

    this.userService.logoutSubject.subscribe((res) => {
      this.likedQuestionId = [];
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.filterQuestionList = this.questionList;
    this.isEmpty = this.filterQuestionList.length == 0 ? true : false;
  }
  getLikesQuestion() {
    if (this.userService.isLoggedIn()) {
      this.loginUserService.getAllLikedQuestion().subscribe((res) => {
        res.forEach((element) => {
          this.likedQuestionId.push(element.id);
          this.num = element.id;
        });
      });
    }
  }

  ngOnInit(): void {}

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe((res) => {
      this.categoryList = res;
    });
  }
  updateList(questions: Question[]) {
    this.filterQuestionList = questions;
    this.isEmpty = this.filterQuestionList.length == 0 ? true : false;
  }
}
