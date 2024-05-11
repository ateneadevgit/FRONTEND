import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAcademicProgramCurrentComponent } from './my-academic-program-current.component';

describe('MyAcademicProgramCurrentComponent', () => {
  let component: MyAcademicProgramCurrentComponent;
  let fixture: ComponentFixture<MyAcademicProgramCurrentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyAcademicProgramCurrentComponent],
    });
    fixture = TestBed.createComponent(MyAcademicProgramCurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
