import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllRepliesComponent } from './show-all-replies.component';

describe('ShowAllRepliesComponent', () => {
  let component: ShowAllRepliesComponent;
  let fixture: ComponentFixture<ShowAllRepliesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAllRepliesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowAllRepliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
