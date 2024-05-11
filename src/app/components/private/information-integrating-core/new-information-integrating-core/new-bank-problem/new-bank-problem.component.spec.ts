import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBankProblemComponent } from './new-bank-problem.component';

describe('NewBankProblemComponent', () => {
  let component: NewBankProblemComponent;
  let fixture: ComponentFixture<NewBankProblemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewBankProblemComponent],
    });
    fixture = TestBed.createComponent(NewBankProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
