import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { MessageService, ToastMessageOptions } from 'primeng/api';

import { ClStateService } from '../../services';

@Component({
    selector: 'cl-toasts',
    imports: [
        ToastModule,
    ],
    templateUrl: './toasts.component.html',
    styleUrl: './toasts.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastsComponent {
  private readonly clStateService = inject(ClStateService);
  private readonly messageService = inject(MessageService);

  constructor () {
    effect(() => {
      const message = this.clStateService.stateMessage();

      if (message?.type === 'toast') {
        const {detail, severity, summary} = message?.payload;

        this.add(detail, summary, severity, 'general');
      }
    });
  }

  private add(detail: string, summary: string, severity: string, key?: string): void {
    const message: ToastMessageOptions = { detail, severity, summary };

    if (key) {
      message.key = key;
    }

    setTimeout(() => {
      this.messageService.add(message);
    });
  }
}
