import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondLanguageLearningComponent } from './second-language-learning.component';

describe('SecondLanguageLearningComponent', () => {
  let component: SecondLanguageLearningComponent;
  let fixture: ComponentFixture<SecondLanguageLearningComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecondLanguageLearningComponent],
    });
    fixture = TestBed.createComponent(SecondLanguageLearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
