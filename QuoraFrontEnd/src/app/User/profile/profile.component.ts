import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/Model/Question';
import { User } from 'src/app/Model/User';
import { LoginUserApiService } from 'src/app/Service/login-user-api.service';
import { QuestionApiService } from 'src/app/Service/question-api.service';
import { UserApiService } from 'src/app/Service/user-api.service';
import { ShowFollowerFollowingComponent } from '../show-follower-following/show-follower-following.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userId: number;
  questionList: Question[];
  user: User;
  loginUser: User;
  isAdminFollowUser: boolean;
  questionLoader: boolean = true;
  isLoading: boolean = true;
  followers: User[];
  followings: User[];

  constructor(
    private snakeBar: MatSnackBar,
    private questionService: QuestionApiService,
    private userService: UserApiService,
    private activatedRoute: ActivatedRoute,
    private loginUserApiService: LoginUserApiService,
    private dialog: MatDialog
  ) {}

  getUserData() {
    this.userService.getUserById(this.userId).subscribe((res) => {
      this.user = res;
      console.log(this.user);
      this.isLoading = false;
      this.getAllQuestions();
      this.getConnectionsData();
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params) => {
      const id: number = params['id'];
      this.userId = id;
      this.getUserData();
    });
  }

  getAllQuestions() {
    this.questionService.getQuestionById(this.userId).subscribe((res) => {
      this.questionList = res;
      this.questionLoader = false;
    });
  }

  getConnectionsData() {
    this.userService.getFollowers(this.user.username).subscribe((res) => {
      this.followers = res;

      if (this.loginUser == null) {
        this.isAdminFollowUser = false;
        return;
      }

      const found = this.followers.find((obj) => {
        return obj.username === this.loginUser.username;
      });

      if (found != undefined) {
        this.isAdminFollowUser = true;
      } else {
        this.isAdminFollowUser = false;
      }
    });

    this.userService.getFollowings(this.user.username).subscribe((res) => {
      this.followings = res;
    });
  }

  showFollowers() {
    this.dialog.open(ShowFollowerFollowingComponent, {
      width: '400px',
      height: '500px',
      data: [0, this.followers],
    });
  }

  showFollowings() {
    this.dialog.open(ShowFollowerFollowingComponent, {
      width: '400px',
      height: '500px',
      data: [1, this.followers],
    });
  }
}
