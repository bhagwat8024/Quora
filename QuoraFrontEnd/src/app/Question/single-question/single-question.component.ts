import { DatePipe } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { elementAt } from 'rxjs';
import { Question } from 'src/app/Model/Question';
import { Reply } from 'src/app/Model/Reply';
import { User } from 'src/app/Model/User';
import { ShowAllRepliesComponent } from 'src/app/Reply/show-all-replies/show-all-replies.component';
import { LoginUserApiService } from 'src/app/Service/login-user-api.service';
import { ReplyApiService } from 'src/app/Service/reply-api.service';
import { UserApiService } from 'src/app/Service/user-api.service';

@Component({
  selector: 'app-single-question',
  templateUrl: './single-question.component.html',
  styleUrls: ['./single-question.component.css'],
  providers: [DatePipe],
})
export class SingleQuestionComponent implements OnInit, OnChanges {
  @Input() question: Question;
  @Input() userLikesQuestion: number[];
  @Input() data: number;

  showReplyToggle = false;

  likeUsers: User[];
  date: Date = new Date();
  isLike: boolean = false;

  constructor(
    private snakeBar: MatSnackBar,
    private userService: UserApiService,
    private loginUserService: LoginUserApiService,
    private router: Router
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.userLikesQuestion.indexOf(this.question.id) != -1) {
      this.isLike = true;
    } else {
      this.isLike = false;
    }
  }

  ngOnInit(): void {}

  goToFullQuestion() {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/question/${this.question.id}`])
    );

    window.open(url, '_blank');
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
