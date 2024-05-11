import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyPlanComponent } from './study-plan.component';

describe('StudyPlanComponent', () => {
  let component: StudyPlanComponent;
  let fixture: ComponentFixture<StudyPlanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudyPlanComponent],
    });
    fixture = TestBed.createComponent(StudyPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
