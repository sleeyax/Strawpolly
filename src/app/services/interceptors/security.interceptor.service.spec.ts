import { TestBed } from '@angular/core/testing';

import { Security.InterceptorService } from './security.interceptor.service';

describe('Security.InterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Security.InterceptorService = TestBed.get(Security.InterceptorService);
    expect(service).toBeTruthy();
  });
});
