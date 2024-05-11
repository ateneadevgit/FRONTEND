import { TestBed } from '@angular/core/testing';

import { SinuService } from './sinu.service';

describe('SinuService', () => {
  let service: SinuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SinuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
