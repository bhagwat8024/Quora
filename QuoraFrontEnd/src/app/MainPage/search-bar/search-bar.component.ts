import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  formControl: FormControl;

  constructor(
    private formBuilder: FormBuilder,
    private snakeBar: MatSnackBar,
    private router: Router
  ) {
    this.formControl = this.formBuilder.control({
      value: '',
      disabled: false,
    });
  }

  ngOnInit(): void {}
  search() {
    let title = this.formControl.value;
    if (title == '' || title == null) {
      this.snakeBar.open('please insert valid query', 'ok');
      return;
    }

    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/search/${title}`])
    );

    window.open(url, '_blank');
  }
}
