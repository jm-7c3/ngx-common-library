import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit,
  ViewContainerRef, inject, signal, viewChild} from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormGroup }
  from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef }
  from 'primeng/dynamicdialog';

import { FormDialogConfig } from '../../models';
import { ButtonComponent } from '../button';

@Component({
  selector: 'cl-form-dialog',
  imports: [
    ButtonComponent,
    DynamicDialogModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormDialogComponent implements OnInit {
  private readonly cdRef = inject(ChangeDetectorRef);
  private readonly dialogConfig = inject(DynamicDialogConfig);
  private readonly dialogRef = inject(DynamicDialogRef);

  private readonly formContainer = viewChild('formContainer', {read: ViewContainerRef});

  readonly cancelLabel = signal('Cancel');
  readonly form = signal<UntypedFormGroup | null>(null);
  readonly header = signal<string>('');
  readonly hideSubmitButton = signal(false);
  readonly submitLabel = signal('Submit');

  constructor(
    @Inject('env') private readonly env: any
  ) {
    const formDialogConfig: FormDialogConfig = this.env?.commonLib?.formDialog;

    if (formDialogConfig) {
      if (formDialogConfig.cancelLabel) {
        this.cancelLabel.set(formDialogConfig.cancelLabel);
      }
      if (formDialogConfig.submitLabel) {
        this.submitLabel.set(formDialogConfig.submitLabel);
      }
    }
  }

  ngOnInit(): void {
    const {component, config, header, value} = this.dialogConfig.data;

    this.header.set(header);

    if (component) {
      setTimeout(() => {
        const {instance} = this.formContainer()!.createComponent(component) as any;

        this.form.set(instance.form);

        if (!this.form) {
          throw new Error('Form not found.');
        }

        if (value) {
          this.form()?.patchValue(value);
        }

        this.cdRef.markForCheck();
      });
    }

    if (config) {
      this.hideSubmitButton.set(config.hideSubmitButton ?? this.hideSubmitButton);

      if (config.cancelLabel) {
        this.cancelLabel.set(config.cancelLabel);
      }
      if (config.submitLabel) {
        this.submitLabel.set(config.submitLabel);
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.form()?.valid) {
      this.dialogRef.close(this.form()!.value);
    }
  }

}
