import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningEvaluationComponent } from './learning-evaluation.component';

describe('LearningEvaluationComponent', () => {
  let component: LearningEvaluationComponent;
  let fixture: ComponentFixture<LearningEvaluationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LearningEvaluationComponent],
    });
    fixture = TestBed.createComponent(LearningEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
