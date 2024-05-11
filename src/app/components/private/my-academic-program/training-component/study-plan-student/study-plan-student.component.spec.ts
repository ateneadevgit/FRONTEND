import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyPlanStudentComponent } from './study-plan-student.component';

describe('StudyPlanStudentComponent', () => {
  let component: StudyPlanStudentComponent;
  let fixture: ComponentFixture<StudyPlanStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudyPlanStudentComponent],
    });
    fixture = TestBed.createComponent(StudyPlanStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
