import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/Model/Category';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  @Input() categoryList: Category[];
  constructor(private router: Router) {}

  ngOnInit(): void {}
  searchByCategory(categoryId: number) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/search/category/${categoryId}`])
    );

    window.open(url, '_blank');
  }
}
