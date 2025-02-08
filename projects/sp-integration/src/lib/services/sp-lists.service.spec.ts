import { TestBed } from '@angular/core/testing';

import { SpListsService } from './sp-lists.service';

describe('SpListsService', () => {
  let service: SpListsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpListsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
