import { Injectable, inject } from '@angular/core';

import { ClStateService } from '../../services';

@Injectable({
  providedIn: 'root'
})
export class ToastsService {
  private readonly clStateService = inject(ClStateService);

  toastError(detail: string, summary = 'Error'): void {
    this.clStateService.updateStateMessage({
      payload: {
        detail,
        severity: 'error',
        summary
      },
      type: 'toast'
    });
  }

  toastSuccess(detail: string, summary = 'Success'): void {
    this.clStateService.updateStateMessage({
      payload: {
        detail,
        severity: 'success',
        summary
      },
      type: 'toast'
    });
  }

  toastWarning(detail: string, summary = 'Warning'): void {
    this.clStateService.updateStateMessage({
      payload: {
        detail,
        severity: 'warning',
        summary
      },
      type: 'toast'
    });
  }
}
