import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/Model/User';
import { PostQuestionComponent } from 'src/app/Question/post-question/post-question.component';
import { UserApiService } from 'src/app/Service/user-api.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  constructor(
    private userService: UserApiService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  isLoggedIn() {
    return localStorage.getItem('token');
  }
  logout() {
    this.userService.logoutUser();
    this.router.navigate(['/main']);
  }

  addQuestion() {
    let dialogRef = this.dialog.open(PostQuestionComponent, {
      height: '400px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  toProfile() {
    let user: User = this.userService.getUser();
    this.router.navigate(['/profile', user.id]);
  }

  goToMain(){
    this.router.navigate(['/']);
  }
}
