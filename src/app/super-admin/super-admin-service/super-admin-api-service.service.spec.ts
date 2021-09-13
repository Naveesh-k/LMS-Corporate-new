import { TestBed } from '@angular/core/testing';

import { SuperAdminApiServiceService } from './super-admin-api-service.service';

describe('SuperAdminApiServiceService', () => {
  let service: SuperAdminApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperAdminApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
