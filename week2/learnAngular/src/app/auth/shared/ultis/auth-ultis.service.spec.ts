import { TestBed } from '@angular/core/testing';

import { AuthUltisService } from './auth-ultis.service';

describe('AuthUltisService', () => {
  let service: AuthUltisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthUltisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
