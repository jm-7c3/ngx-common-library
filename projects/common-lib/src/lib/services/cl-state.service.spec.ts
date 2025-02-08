import { TestBed } from '@angular/core/testing';

import { ClStateService } from './cl-state.service';

describe('ClStateService', () => {
  let service: ClStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
