import { TestBed } from '@angular/core/testing';

import { LmsAuthService } from './lms-auth.service';

describe('LmsAuthService', () => {
  let service: LmsAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LmsAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
