import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyPlanCurriculumComponent } from './study-plan-curriculum.component';

describe('StudyPlanCurriculumComponent', () => {
  let component: StudyPlanCurriculumComponent;
  let fixture: ComponentFixture<StudyPlanCurriculumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudyPlanCurriculumComponent],
    });
    fixture = TestBed.createComponent(StudyPlanCurriculumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
