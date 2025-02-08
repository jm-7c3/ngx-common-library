import { Injectable, inject } from '@angular/core';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Observable, filter, map } from 'rxjs';

import { ClStateService } from '../../services';
import { ContentDialogComponent } from './content-dialog.component';
import { ContentDialogData } from './content-dialog.models';

@Injectable({
  providedIn: 'root'
})
export class ContentDialogService {
  private readonly clStateService = inject(ClStateService);
  private readonly dialogService = inject(DialogService);

  onCancel(key: string): Observable<{key: string}> {
    return this.clStateService.onStateMessage('content-dialog-close').pipe(
      filter(message => message?.payload.key === key),
      map(() => ({key}))
    )
  }

  open(data: ContentDialogData): void {
    const {component, config, header, key, styleClass} = data;
    const dialogConfig: DynamicDialogConfig = {
      closable: false,
      data: { component, config, key },
      header,
      showHeader: true,
      styleClass: styleClass ?? 'w-4'
    };

    this.dialogService.open(ContentDialogComponent, dialogConfig).onClose
      .subscribe(() => {
        this.clStateService.updateStateMessage({
          key,
          type: 'content-dialog-close'
        });
      });
  }
}
