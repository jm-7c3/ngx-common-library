import { Injectable, inject } from '@angular/core';
import { Observable, filter, map } from 'rxjs';

import { ClStateService } from '../../services';
import { ConfirmationData } from './confirmation.models';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {
  private readonly clStateService = inject(ClStateService);

  confirm({data, header, key, message, type}: ConfirmationData): void {
    const confirmationData: ConfirmationData = {
      data,
      header,
      key: 'general',
      message
    };

    switch (type) {
      case 'warning':
        confirmationData.key = 'general-warning';
        break;
    }

    this.clStateService.updateStateMessage({
      key,
      payload: confirmationData,
      type: 'confirmation'
    });
  }

  onAccept(key: string): Observable<{data: any}> {
    return this.clStateService.onStateMessage('confirmation-accept').pipe(
      filter(message => message?.payload.key === key),
      map(message => message?.payload)
    );
  }

  onCancel(key: string): Observable<{data?: any, key: string}> {
    return this.clStateService.onStateMessage('confirmation-cancel').pipe(
      filter(message => message?.payload.key === key),
      map(message => message?.payload)
    );
  }
}
