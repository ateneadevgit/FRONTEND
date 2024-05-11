import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemBankTableComponent } from './problem-bank-table.component';

describe('ProblemBankTableComponent', () => {
  let component: ProblemBankTableComponent;
  let fixture: ComponentFixture<ProblemBankTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProblemBankTableComponent],
    });
    fixture = TestBed.createComponent(ProblemBankTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
