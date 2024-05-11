import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryAcademicComponent } from './summary-academic.component';

describe('SummaryAcademicComponent', () => {
  let component: SummaryAcademicComponent;
  let fixture: ComponentFixture<SummaryAcademicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SummaryAcademicComponent],
    });
    fixture = TestBed.createComponent(SummaryAcademicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
