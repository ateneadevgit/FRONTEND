import { TestBed } from '@angular/core/testing';

import { SecondLanguageService } from './second-language.service';

describe('SecondLanguageService', () => {
  let service: SecondLanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecondLanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
