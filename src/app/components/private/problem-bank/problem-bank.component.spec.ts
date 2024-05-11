import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemBankComponent } from './problem-bank.component';

describe('ProblemBankComponent', () => {
  let component: ProblemBankComponent;
  let fixture: ComponentFixture<ProblemBankComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProblemBankComponent],
    });
    fixture = TestBed.createComponent(ProblemBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
