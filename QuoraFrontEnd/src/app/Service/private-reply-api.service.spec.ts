import { TestBed } from '@angular/core/testing';

import { PrivateReplyApiService } from './private-reply-api.service';

describe('PrivateReplyApiService', () => {
  let service: PrivateReplyApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrivateReplyApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
