import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, inject }
  from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ProgressBarModule } from 'primeng/progressbar';

import { ClStateService } from '../../services';

@Component({
  selector: 'cl-progress-bar-dialog',
  imports: [
    CommonModule,
    DialogModule,
    ProgressBarModule,
  ],
  templateUrl: './progress-bar-dialog.component.html',
  styleUrl: './progress-bar-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarDialogComponent {
  private readonly cdRef = inject(ChangeDetectorRef);
  private readonly clStateService = inject(ClStateService);

  visible = false;

  constructor () {
    effect(() => {
      switch (this.clStateService.stateMessage()?.type) {
        case 'progess-bar-dialog-close':
          this.visible = false;

          this.cdRef.markForCheck();
          break;
        case 'progess-bar-dialog-open':
          this.visible = true;

          this.cdRef.markForCheck();
          break;
      }
    });
  }
}
