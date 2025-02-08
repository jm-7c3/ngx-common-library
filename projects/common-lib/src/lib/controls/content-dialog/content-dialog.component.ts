import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit, inject, signal }
  from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { ContentDialogConfig } from '../../models';
import { ButtonComponent } from '../button';

@Component({
  selector: 'cl-content-dialog',
  imports: [
  ButtonComponent,
  CommonModule,
  ],
  templateUrl: './content-dialog.component.html',
  styleUrl: './content-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentDialogComponent implements OnInit {
  private readonly dialogConfig = inject(DynamicDialogConfig);
  private readonly dialogRef = inject(DynamicDialogRef);

  readonly component = signal<any>(null);
  readonly closeLabel = signal('Close');
  readonly header = signal('');

  constructor(
    @Inject('env') private readonly env: any
  ) {
    const contentDialogConfig: ContentDialogConfig = this.env?.commonLib?.contentDialog;

    if (contentDialogConfig) {
      if (contentDialogConfig.closeLabel) {
        this.closeLabel.set(contentDialogConfig.closeLabel);
      }
    }
  }

  ngOnInit(): void {
    const {component, config, header} = this.dialogConfig.data;

    if (component) {
      this.component.set(component);
    }

    if (config) {
      const {closeLabel} = config;

      if (closeLabel) {
        this.closeLabel.set(closeLabel);
      }
    }

    if (header) {
      this.header.set(header);
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
