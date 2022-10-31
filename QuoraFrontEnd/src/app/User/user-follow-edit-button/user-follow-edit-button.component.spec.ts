import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFollowEditButtonComponent } from './user-follow-edit-button.component';

describe('UserFollowEditButtonComponent', () => {
  let component: UserFollowEditButtonComponent;
  let fixture: ComponentFixture<UserFollowEditButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFollowEditButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserFollowEditButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
