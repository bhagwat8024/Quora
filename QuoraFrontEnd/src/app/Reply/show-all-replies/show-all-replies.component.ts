import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Reply } from 'src/app/Model/Reply';

@Component({
  selector: 'app-show-all-replies',
  templateUrl: './show-all-replies.component.html',
  styleUrls: ['./show-all-replies.component.css'],
})
export class ShowAllRepliesComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Reply[]) {}

  ngOnInit(): void {}
}
