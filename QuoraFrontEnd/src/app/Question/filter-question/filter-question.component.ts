import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { filter } from 'rxjs';
import { Question } from 'src/app/Model/Question';

@Component({
  selector: 'app-filter-question',
  templateUrl: './filter-question.component.html',
  styleUrls: ['./filter-question.component.css'],
})
export class FilterQuestionComponent implements OnInit {
  @Input() question: Question[];
  @Output() filterQuestion: EventEmitter<Question[]> = new EventEmitter();

  isIncByLike: boolean = true;
  isIncByReplies: boolean = true;
  isIncByDate: boolean = true;

  formValue: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formValue = this.formBuilder.group({
      author: [''],
    });
  }

  ngOnInit(): void {}

  sortByLike() {
    this.isIncByLike = !this.isIncByLike;
    if (this.isIncByLike) {
      this.question.sort((a, b) => (a.likes < b.likes ? -1 : 1));
    } else {
      this.question.sort((a, b) => (a.likes > b.likes ? -1 : 1));
    }

    this.filterQuestion.emit(this.question);
  }

  sortByReplies() {
    this.isIncByReplies = !this.isIncByReplies;
    if (this.isIncByReplies) {
      this.question.sort((a, b) => (a.totalReplies < b.totalReplies ? -1 : 1));
    } else {
      this.question.sort((a, b) => (a.totalReplies > b.totalReplies ? -1 : 1));
    }

    this.filterQuestion.emit(this.question);
  }

  sortByDate() {
    this.isIncByDate = !this.isIncByDate;
    if (this.isIncByDate) {
      this.question.sort((a, b) => (a.date < b.date ? -1 : 1));
    } else {
      this.question.sort((a, b) => (a.date > b.date ? -1 : 1));
    }
    let filter = this.question;
    this.filterQuestion.emit(filter);
  }

  byAuthor() {
    let author: string = this.formValue.value.author;
    let filter: Question[];
    filter = this.question.filter(function (que) {
      return que.user.firstName.includes(author);
    });
    console.log(filter);
    this.filterQuestion.emit(filter);
  }
}
