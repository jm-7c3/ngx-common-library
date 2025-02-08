import { Injectable, inject } from '@angular/core';

import { ClStateService } from '../../services';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarDialogService {
  private readonly clStateService = inject(ClStateService);

  close(): void {
    this.clStateService.updateStateMessage({
      type: 'progess-bar-dialog-close'
    });
  }

  open(): void {
    this.clStateService.updateStateMessage({
      type: 'progess-bar-dialog-open'
    });
  }
}
