import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SecurityToken } from 'src/app/Model/token';
import { User } from 'src/app/Model/User';
import { UserApiService } from 'src/app/Service/user-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isExist: boolean;
  formValue: FormGroup;
  user: User = new User();

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserApiService,
    private router: Router,
    private snakeBar: MatSnackBar
  ) {
    this.formValue = this.formBuilder.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(12),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(12),
        ],
      ],
    });
  }

  ngOnInit(): void {}

  login() {
    console.log('in login');

    this.user.username = this.formValue.value.username;
    this.user.password = this.formValue.value.password;

    this.userService.generateToken(this.user).subscribe(
      (res) => {
        this.userService.loginUser(res.token);
        this.userService.getCurrentUser().subscribe(
          (user) => {
            this.userService.setUser(user);
            if (user != null) {
              this.router.navigate(['/']);
            }
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.log(error);
        this.snakeBar.open(error.error.message, 'OK');
      }
    );
    /*
    this.userService
      .isUserExist(this.formValue.value.email)
      .subscribe((res) => {
        if (res == false) {
          alert('User Not Exist');
        } else {
          this.loginValidate(
            this.formValue.value.email,
            this.formValue.value.password
          );
        }
      });
      */
  }

  loginValidate(email: string, password: string) {
    /*
    this.userService.userValidate(email, password).subscribe((user) => {
      if (user == null) {
        alert('Invalid Password');
      } else {
        console.log(user.userId);
        localStorage.setItem('loginToken', user.userId + '');
        this.router.navigate(['/main']);
      }
    });
    */
  }

  loginUserDetails(securityToken: SecurityToken) {
    let token: string = securityToken.token;
    console.log(this.userService);
    this.userService.temp();
  }
}
