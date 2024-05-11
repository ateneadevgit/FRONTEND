import { TestBed } from '@angular/core/testing';

import { EportafolioService } from './eportafolio.service';

describe('EportafolioService', () => {
  let service: EportafolioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EportafolioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
