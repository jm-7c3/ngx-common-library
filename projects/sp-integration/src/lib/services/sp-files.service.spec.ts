import { TestBed } from '@angular/core/testing';

import { SpFilesService } from './sp-files.service';

describe('SpFilesService', () => {
  let service: SpFilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpFilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
