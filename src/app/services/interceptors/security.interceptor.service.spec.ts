import { TestBed } from '@angular/core/testing';

import { SecurityInterceptor } from './security.interceptor.service';

describe('Security.InterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SecurityInterceptor = TestBed.get(SecurityInterceptor);
    expect(service).toBeTruthy();
  });
});
