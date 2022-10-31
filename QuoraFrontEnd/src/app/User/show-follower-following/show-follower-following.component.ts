import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/Model/User';

@Component({
  selector: 'app-show-follower-following',
  templateUrl: './show-follower-following.component.html',
  styleUrls: ['./show-follower-following.component.css'],
})
export class ShowFollowerFollowingComponent implements OnInit {
  users: User[];
  isFollowers: boolean;

  constructor(
    private dialogRef: MatDialogRef<ShowFollowerFollowingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.users = data[1];
    this.isFollowers = data[0] == 0 ? true : false;
  }

  ngOnInit(): void {}
  close() {
    this.dialogRef.close();
  }
}
