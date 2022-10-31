import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopReplyDivComponent } from './top-reply-div.component';

describe('TopReplyDivComponent', () => {
  let component: TopReplyDivComponent;
  let fixture: ComponentFixture<TopReplyDivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopReplyDivComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopReplyDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
