import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFollowerFollowingComponent } from './show-follower-following.component';

describe('ShowFollowerFollowingComponent', () => {
  let component: ShowFollowerFollowingComponent;
  let fixture: ComponentFixture<ShowFollowerFollowingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowFollowerFollowingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowFollowerFollowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
