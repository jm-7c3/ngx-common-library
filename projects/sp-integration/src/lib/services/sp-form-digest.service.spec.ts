import { TestBed } from '@angular/core/testing';

import { SpFormDigestService } from './sp-form-digest.service';

describe('SpFormDigestService', () => {
  let service: SpFormDigestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpFormDigestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
