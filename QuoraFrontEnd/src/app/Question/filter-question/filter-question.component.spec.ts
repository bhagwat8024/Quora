import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterQuestionComponent } from './filter-question.component';

describe('FilterQuestionComponent', () => {
  let component: FilterQuestionComponent;
  let fixture: ComponentFixture<FilterQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterQuestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
