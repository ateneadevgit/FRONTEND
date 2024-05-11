import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAcademicProgramComponent } from './create-academic-program.component';

describe('CreateAcademicProgramComponent', () => {
  let component: CreateAcademicProgramComponent;
  let fixture: ComponentFixture<CreateAcademicProgramComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateAcademicProgramComponent],
    });
    fixture = TestBed.createComponent(CreateAcademicProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
