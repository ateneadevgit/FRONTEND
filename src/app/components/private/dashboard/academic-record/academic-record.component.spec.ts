import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicRecordComponent } from './academic-record.component';

describe('AcademicRecordComponent', () => {
  let component: AcademicRecordComponent;
  let fixture: ComponentFixture<AcademicRecordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcademicRecordComponent],
    });
    fixture = TestBed.createComponent(AcademicRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
