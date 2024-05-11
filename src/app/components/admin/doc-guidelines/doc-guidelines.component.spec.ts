import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocGuidelinesComponent } from './doc-guidelines.component';

describe('DocGuidelinesComponent', () => {
  let component: DocGuidelinesComponent;
  let fixture: ComponentFixture<DocGuidelinesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocGuidelinesComponent],
    });
    fixture = TestBed.createComponent(DocGuidelinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
