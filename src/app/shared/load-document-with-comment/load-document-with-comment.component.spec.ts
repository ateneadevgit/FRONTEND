import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadDocumentWithCommentComponent } from './load-document-with-comment.component';

describe('LoadDocumentWithCommentComponent', () => {
  let component: LoadDocumentWithCommentComponent;
  let fixture: ComponentFixture<LoadDocumentWithCommentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadDocumentWithCommentComponent],
    });
    fixture = TestBed.createComponent(LoadDocumentWithCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
