import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectProgramsComponent } from './subject-programs.component';

describe('SubjectProgramsComponent', () => {
  let component: SubjectProgramsComponent;
  let fixture: ComponentFixture<SubjectProgramsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubjectProgramsComponent],
    });
    fixture = TestBed.createComponent(SubjectProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
