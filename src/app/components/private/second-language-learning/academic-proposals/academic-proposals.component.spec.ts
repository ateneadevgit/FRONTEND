import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicProposalsComponent } from './academic-proposals.component';

describe('AcademicProposalsComponent', () => {
  let component: AcademicProposalsComponent;
  let fixture: ComponentFixture<AcademicProposalsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcademicProposalsComponent],
    });
    fixture = TestBed.createComponent(AcademicProposalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
