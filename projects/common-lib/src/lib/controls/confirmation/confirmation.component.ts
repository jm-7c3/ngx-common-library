import { ChangeDetectionStrategy, Component, Inject, effect, inject, signal }
  from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationService as PngConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { ClStateMessage, ConfirmationConfig } from '../../models';
import { ClStateService } from '../../services';
import { ButtonComponent } from '../button';

@Component({
  selector: 'cl-confirmation',
  imports: [
    ButtonComponent,
    CommonModule,
    ConfirmDialogModule,
  ],
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationComponent {
  private readonly clStateService = inject(ClStateService);
  private readonly confirmationService = inject(PngConfirmationService);

  readonly acceptLabel = signal('Accept');
  readonly cancelLabel = signal('Cancel');

  constructor(
    @Inject('env') private readonly env: any
  ) {
    const confirmationConfig: ConfirmationConfig = this.env?.commonLib?.confirmation;

    if (confirmationConfig) {
      if (confirmationConfig.acceptLabel) {
        this.acceptLabel.set(confirmationConfig.acceptLabel);
      }
      if (confirmationConfig.cancelLabel) {
        this.cancelLabel.set(confirmationConfig.cancelLabel);
      }
    }

    effect(() => {
      const message = this.clStateService.stateMessage();

      if (message?.type === 'confirmation') {
        this.openConfirmDialog(message);
      }
    });
  }

  private openConfirmDialog({payload}: ClStateMessage): void {
    const {data, header, key, message} = payload;

    this.confirmationService.confirm({
      accept: () => {
        this.clStateService.updateStateMessage({
          key,
          payload: data,
          type: 'confirmation-accept'
        });
      },
      acceptButtonStyleClass: 'primary',
      closeOnEscape: false,
      header,
      key,
      message,
      reject: () => {
        this.clStateService.updateStateMessage({
          key,
          payload: data,
          type: 'confirmation-cancel'
        });
      },
    });
  }
}
