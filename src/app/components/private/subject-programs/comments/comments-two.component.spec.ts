import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsTwoComponent } from './comments-two.component';

describe('CommentsComponent', () => {
  let component: CommentsTwoComponent;
  let fixture: ComponentFixture<CommentsTwoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommentsTwoComponent],
    });
    fixture = TestBed.createComponent(CommentsTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
