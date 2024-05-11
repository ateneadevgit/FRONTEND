import { TestBed } from '@angular/core/testing';

import { FloatingMenuService } from './floating-menu.service';

describe('FloatingMenuService', () => {
  let service: FloatingMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FloatingMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
