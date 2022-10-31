import { Component, Input, OnInit } from '@angular/core';
import { Reply } from 'src/app/Model/Reply';

@Component({
  selector: 'app-reply-question',
  templateUrl: './reply-question.component.html',
  styleUrls: ['./reply-question.component.css'],
})
export class ReplyQuestionComponent implements OnInit {
  @Input() reply: Reply;
  constructor() {}

  ngOnInit(): void {}
}
