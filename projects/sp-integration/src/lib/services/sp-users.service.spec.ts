import { TestBed } from '@angular/core/testing';

import { SpUsersService } from './sp-users.service';

describe('SpUsersService', () => {
  let service: SpUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
