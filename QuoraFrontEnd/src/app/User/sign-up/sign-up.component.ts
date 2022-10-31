import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, TitleStrategy, UrlSegment } from '@angular/router';
import { UserApiService } from 'src/app/Service/user-api.service';
import { User } from 'src/app/Model/User';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [DatePipe],
})
export class SignUpComponent implements OnInit {
  user: User = new User();
  date: Date = new Date();
  temp: User = new User();
  formValue: FormGroup;

  constructor(
    private http: HttpClient,
    private userService: UserApiService,
    private formBuilder: FormBuilder,
    private router: Router,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar
  ) {
    this.formValue = this.formBuilder.group(
      {
        firstName: [
          '',
          [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(20),
          ],
        ],
        lastName: [
          '',
          [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(20),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(12),
          ],
        ],
        cpassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(12),
          ],
        ],
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(16),
          ],
        ],
        phone: [
          '',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
          ],
        ],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  ngOnInit(): void {}

  signup() {
    this.user.email = this.formValue.value.email;
    this.user.firstName = this.formValue.value.firstName;
    this.user.lastName = this.formValue.value.lastName;
    this.user.password = this.formValue.value.password;
    this.user.username = this.formValue.value.username;
    this.user.phone = this.formValue.value.phone;

    this.user.joiningDate = this.datePipe.transform(this.date, 'yyyy-MM-dd');

    this.userService.registerUser(this.user).subscribe(
      (res) => {
        this.temp = res;
        this.router.navigate(['/login']);
      },
      (err) => {
        this.snackBar.open(err, 'OK');
      }
    );
  }
  passwordMatchValidator(formGroup: FormGroup) {
    if (
      formGroup.controls['password'].value ===
      formGroup.controls['cpassword'].value
    ) {
      console.log(' match');
      return { mismatch: false };
    } else {
      console.log('not match');
      return { mismatch: true };
    }
  }
}
