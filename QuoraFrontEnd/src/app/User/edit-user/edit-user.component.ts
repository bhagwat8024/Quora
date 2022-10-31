import { DialogRef } from '@angular/cdk/dialog';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs';
import { User } from 'src/app/Model/User';
import { LoginUserApiService } from 'src/app/Service/login-user-api.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  user: User;
  formValue: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private formBuilder: FormBuilder,
    private loginUserApiService: LoginUserApiService
  ) {
    this.user = data;
    this.formValue = this.formBuilder.group({
      firstName: [this.user.firstName],
      lastName: [this.user.lastName],
      about: [this.user.about],
    });
  }

  ngOnInit(): void {}

  onCancel() {
    this.dialogRef.close(false);
  }

  update() {
    let firstName = this.formValue.value.firstName;
    let lastName = this.formValue.value.lastName;
    let about = this.formValue.value.about;
    this.loginUserApiService.updateData(
      firstName,
      lastName,
      about,
      this.user.id
    );
    this.dialogRef.close(true);
  }
}
