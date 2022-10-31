import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from 'src/app/Model/Category';
import { Question } from 'src/app/Model/Question';
import { CategoryApiService } from 'src/app/Service/category-api.service';
import { PrivateQuestionApiService } from 'src/app/Service/private-question-api.service';
import { QuestionApiService } from 'src/app/Service/question-api.service';
import { UserApiService } from 'src/app/Service/user-api.service';

export interface DialogData {}

@Component({
  selector: 'app-post-question',
  templateUrl: './post-question.component.html',
  styleUrls: ['./post-question.component.css'],
  providers: [DatePipe],
})
export class PostQuestionComponent implements OnInit {
  categories: Category[];
  formValue: FormGroup;
  question: Question = new Question();
  date: Date = new Date();

  constructor(
    private categoryService: CategoryApiService,
    private dialogRef: MatDialogRef<PostQuestionComponent>,
    private formBuilder: FormBuilder,
    private userService: UserApiService,
    private datePipe: DatePipe,
    private snakeBar: MatSnackBar,
    private questionService: QuestionApiService,
    private privateQuestionService: PrivateQuestionApiService
  ) {
    this.formValue = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      categoryId: ['', Validators.required],
    });

    this.categoryService.getAllCategories().subscribe((res) => {
      this.categories = res;
    });
  }

  ngOnInit(): void {}
  onNoClick() {
    this.dialogRef.close();
  }

  post() {
    if (
      this.formValue.value.categoryId == null ||
      this.formValue.value.categoryId == ''
    ) {
      this.snakeBar.open('Please Select Category', 'Ok');
      return;
    }

    if (
      this.formValue.value.title == '' ||
      this.formValue.value.description == ''
    ) {
      this.snakeBar.open('Please Enter Title or Description', 'Ok');
      return;
    }

    this.question.title = this.formValue.value.title;
    this.question.description = this.formValue.value.description;
    this.question.category = new Category();
    this.question.category.id = this.formValue.value.categoryId;

    this.question.user = this.userService.getUser();
    this.question.date = this.datePipe.transform(this.date, 'yyyy-MM-dd');

    this.privateQuestionService.postQuestion(this.question).subscribe((res) => {
      console.log(this.question);
    });
    this.dialogRef.close();
  }
}
