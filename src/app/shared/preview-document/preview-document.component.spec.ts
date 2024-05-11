import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewDocumentComponent } from './preview-document.component';

describe('PreviewDocumentComponent', () => {
  let component: PreviewDocumentComponent;
  let fixture: ComponentFixture<PreviewDocumentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreviewDocumentComponent],
    });
    fixture = TestBed.createComponent(PreviewDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
