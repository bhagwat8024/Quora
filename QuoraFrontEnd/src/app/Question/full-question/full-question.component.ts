import { DatePipe } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/Model/Question';
import { User } from 'src/app/Model/User';
import { LoginUserApiService } from 'src/app/Service/login-user-api.service';
import { QuestionApiService } from 'src/app/Service/question-api.service';
import { UserApiService } from 'src/app/Service/user-api.service';

@Component({
  selector: 'app-full-question',
  templateUrl: './full-question.component.html',
  styleUrls: ['./full-question.component.css'],
  providers: [DatePipe],
})
export class FullQuestionComponent implements OnInit {
  loginUser: User;
  questionId: number;
  question: Question;
  showReplyToggle: boolean = false;
  likeUsers: User[];
  date: Date = new Date();
  isLike: boolean = false;
  noQuestionFound: boolean = true;
  userLikesQuestions: number[] = [];

  constructor(
    private snakeBar: MatSnackBar,
    private userService: UserApiService,
    private loginUserService: LoginUserApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private questionService: QuestionApiService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.questionId = params['id'];
      this.getFullQuestion();
    });
    this.getLikeQuestion();
    this.userService.logoutSubject.subscribe((res) => {
      this.userLikesQuestions = [];
    });
  }

  getLikeQuestion() {
    if (!this.userService.isLoggedIn()) return;
    this.loginUserService.getAllLikedQuestion().subscribe((res) => {
      res.forEach((element) => {
        this.userLikesQuestions.push(element.id);
      });
      console.log(this.userLikesQuestions);
      if (this.userLikesQuestions.indexOf(this.question.id) != -1) {
        console.log(true);
        this.isLike = true;
      } else {
        console.log(false);
        this.isLike = false;
      }
    });
  }

  ngOnInit(): void {}

  getFullQuestion() {
    this.questionService.getQuestion(this.questionId).subscribe(
      (res) => {
        this.question = res;
        this.noQuestionFound = false;
      },
      (error) => {
        this.noQuestionFound = true;
      }
    );
  }

  isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }

  likeToggle() {
    if (!this.isLoggedIn()) {
      this.snakeBar.open('please log in', 'ok');
      return;
    }

    if (!this.isLike) {
      this.loginUserService.likeQuestion(this.question.id);
      this.question.likes++;
    } else {
      this.loginUserService.unlikeQuestion(this.question.id);
      this.question.likes--;
    }
    this.isLike = !this.isLike;
    return;
  }

  showReplies() {
    this.showReplyToggle = !this.showReplyToggle;
    if (!this.showReplyToggle) return;
  }

  goToProfile() {
    this.router.navigate(['/profile', this.question.user.id]);
  }
}
