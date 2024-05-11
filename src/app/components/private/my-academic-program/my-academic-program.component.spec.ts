import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAcademicProgramComponent } from './my-academic-program.component';

describe('MyAcademicProgramComponent', () => {
  let component: MyAcademicProgramComponent;
  let fixture: ComponentFixture<MyAcademicProgramComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyAcademicProgramComponent],
    });
    fixture = TestBed.createComponent(MyAcademicProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
