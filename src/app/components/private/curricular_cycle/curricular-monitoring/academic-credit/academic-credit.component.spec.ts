import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicCreditComponent } from './academic-credit.component';

describe('AcademicCreditComponent', () => {
  let component: AcademicCreditComponent;
  let fixture: ComponentFixture<AcademicCreditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcademicCreditComponent],
    });
    fixture = TestBed.createComponent(AcademicCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
