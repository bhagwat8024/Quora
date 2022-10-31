import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/Model/User';
import { LoginUserApiService } from 'src/app/Service/login-user-api.service';
import { UserApiService } from 'src/app/Service/user-api.service';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-user-follow-edit-button',
  templateUrl: './user-follow-edit-button.component.html',
  styleUrls: ['./user-follow-edit-button.component.css'],
})
export class UserFollowEditButtonComponent implements OnInit, OnChanges {
  @Input() user: User;
  @Output() updateFollowerData: EventEmitter<boolean> = new EventEmitter();
  @Output() updateUserData: EventEmitter<boolean> = new EventEmitter();

  loginUser: User;
  isAdminProfile: boolean = false;
  isAdminFollowUser: boolean;

  constructor(
    private snakeBar: MatSnackBar,
    private userService: UserApiService,
    private loginUserApiService: LoginUserApiService,
    private dialog: MatDialog
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.loginUser = this.userService.getUser();
    if (this.loginUser && this.user.username == this.loginUser.username) {
      this.isAdminProfile = true;
    }
    this.getFollowers();
  }

  ngOnInit(): void {}

  isLoggedIn() {
    return this.userService.isLoggedIn();
  }

  follow() {
    if (!this.isLoggedIn()) {
      this.snakeBar.open('please log in', 'ok');
      return;
    }
    this.loginUserApiService
      .followUser(this.loginUser.id, this.user.id)
      .subscribe((res) => {
        this.isAdminFollowUser = true;
        this.user.followersCount++;
        this.updateFollowerData.emit(true);
      });
  }

  unFollow() {
    if (!this.isLoggedIn()) {
      this.snakeBar.open('please log in', 'ok');
      return;
    }
    this.loginUserApiService
      .unfollowUser(this.loginUser.id, this.user.id)
      .subscribe((res) => {
        this.isAdminFollowUser = false;
        this.user.followersCount--;
        this.updateFollowerData.emit(true);
      });
  }

  editProfile() {
    let dialogRef = this.dialog.open(EditUserComponent, {
      height: '500px',
      width: '800px',
      data: this.user,
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.updateUserData.emit(true);
      }
    });
  }

  getFollowers() {
    this.userService.getFollowers(this.user.username).subscribe((followers) => {
      if (this.loginUser == null) {
        this.isAdminFollowUser = false;
        return;
      }

      const found = followers.find((obj) => {
        return obj.username === this.loginUser.username;
      });

      if (found != undefined) {
        this.isAdminFollowUser = true;
      } else {
        this.isAdminFollowUser = false;
      }
    });
  }
}
