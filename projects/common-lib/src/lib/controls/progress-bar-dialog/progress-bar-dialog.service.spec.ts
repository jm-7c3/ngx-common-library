import { TestBed } from '@angular/core/testing';

import { ProgressBarDialogService } from './progress-bar-dialog.service';

describe('ProgressBarDialogService', () => {
  let service: ProgressBarDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgressBarDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
