import { TestBed } from '@angular/core/testing';

import { ProblemBankService } from './problem-bank.service';

describe('ProblemBankService', () => {
  let service: ProblemBankService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProblemBankService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
