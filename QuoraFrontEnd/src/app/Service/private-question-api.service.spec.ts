import { TestBed } from '@angular/core/testing';

import { PrivateQuestionApiService } from './private-question-api.service';

describe('PrivateQuestionApiService', () => {
  let service: PrivateQuestionApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrivateQuestionApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
