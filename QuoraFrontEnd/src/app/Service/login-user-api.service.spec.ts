import { TestBed } from '@angular/core/testing';

import { LoginUserApiService } from './login-user-api.service';

describe('LoginUserApiService', () => {
  let service: LoginUserApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginUserApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
