import { TestBed } from '@angular/core/testing';

import { LmsLocalStorageService } from './lms-local-storage.service';

describe('LmsLocalStorageService', () => {
  let service: LmsLocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LmsLocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
