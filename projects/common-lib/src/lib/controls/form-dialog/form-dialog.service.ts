import { Injectable, inject } from '@angular/core';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Observable, filter, map } from 'rxjs';

import { ClStateService } from '../../services';
import { FormDialogComponent } from './form-dialog.component';
import { FormDialogData } from './form-dialog.models';

@Injectable({
  providedIn: 'root'
})
export class FormDialogService {
  private readonly clStateService = inject(ClStateService);
  private readonly dialogService = inject(DialogService);

  onCancel(key: string): Observable<null> {
    return this.clStateService.onStateMessage('form-dialog-cancel').pipe(
      filter(message => message?.key === key),
      map(() => null)
    );
  }

  onSubmit(key: string): Observable<any> {
    return this.clStateService.onStateMessage('form-dialog-submit').pipe(
      filter(message => message?.key === key),
      map(message => message?.payload)
    );
  }

  // Workaround untill primeng v16.2.1 is available
  open(data: FormDialogData): void {
    const {component, config, header, key, styleClass, value} = data;
    const dialogConfig: DynamicDialogConfig = {
      data: { component, config, key, value },
      focusOnShow: false,
      header,
      modal: true,
      styleClass
    };

    const ref = this.dialogService.open(FormDialogComponent, dialogConfig);

    ref.onClose.subscribe(value => {
        if (value) {
          this.clStateService.updateStateMessage({
            key,
            payload: value,
            type: 'form-dialog-submit'
          });
        } else {
          this.clStateService.updateStateMessage({
            key,
            type: 'form-dialog-cancel'
          });
        }
      });
  }
}
