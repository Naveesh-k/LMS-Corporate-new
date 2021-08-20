import { TestBed } from '@angular/core/testing';

import { GobalService } from './gobal.service';

describe('GobalService', () => {
  let service: GobalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GobalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
