import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAcademicProgramProgressComponent } from './my-academic-program-progress.component';

describe('MyAcademicProgramProgressComponent', () => {
  let component: MyAcademicProgramProgressComponent;
  let fixture: ComponentFixture<MyAcademicProgramProgressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyAcademicProgramProgressComponent],
    });
    fixture = TestBed.createComponent(MyAcademicProgramProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
