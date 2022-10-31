import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Question } from 'src/app/Model/Question';
import { Reply } from 'src/app/Model/Reply';
import { LoginUserApiService } from 'src/app/Service/login-user-api.service';
import { PrivateReplyApiService } from 'src/app/Service/private-reply-api.service';
import { ReplyApiService } from 'src/app/Service/reply-api.service';
import { UserApiService } from 'src/app/Service/user-api.service';
import { ShowAllRepliesComponent } from '../show-all-replies/show-all-replies.component';

@Component({
  selector: 'app-top-reply-div',
  templateUrl: './top-reply-div.component.html',
  styleUrls: ['./top-reply-div.component.css'],
})
export class TopReplyDivComponent implements OnInit {
  @Input() question: Question;
  replies: Reply[];
  topReplies: Reply[];
  formValue: FormGroup;
  date: Date = new Date();

  constructor(
    private replyService: ReplyApiService,
    private formBuilder: FormBuilder,
    private snakeBar: MatSnackBar,
    private datePipe: DatePipe,
    private userService: UserApiService,
    private dialog: MatDialog,
    private privateReplyService: PrivateReplyApiService
  ) {
    this.formValue = this.formBuilder.group({
      description: [''],
    });
  }

  ngOnInit(): void {
    this.getReplies();
  }

  isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }

  getReplies() {
    this.replyService.getRepliesByQId(this.question.id).subscribe((res) => {
      this.replies = res;

      if (this.replies.length > 5) {
        this.topReplies = this.replies.slice(0, 5);
      } else {
        this.topReplies = this.replies;
      }
    });
  }

  openShowAllReplies() {
    this.dialog.open(ShowAllRepliesComponent, {
      height: '400px',
      width: '600px',
      data: this.replies,
    });
  }

  postReply() {
    if (this.formValue.value.description == '') {
      this.snakeBar.open('Reply must not empty..', 'ok');
      return;
    }

    let reply: Reply = new Reply();
    reply.description = this.formValue.value.description;
    reply.date = this.datePipe.transform(this.date, 'yyyy-MM-dd');
    reply.question = this.question;
    reply.user = this.userService.getUser();

    this.privateReplyService.postReply(reply).subscribe((res) => {
      this.question.totalReplies++;
      this.getReplies();
      this.formValue.value.description = '';
    });
  }
}
