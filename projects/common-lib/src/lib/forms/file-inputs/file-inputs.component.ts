import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, input,
  output} from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormsModule, NG_VALIDATORS,
  NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidationErrors, Validators }
  from '@angular/forms';
import { ButtonModule } from 'primeng/button';

import { BaseFormComponent } from '../base-form';
import { FileInput, FileInputComponent } from '../file-input';

@Component({
  selector: 'cl-file-inputs',
  imports: [
    ButtonModule,
    FileInputComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './file-inputs.component.html',
  styleUrl: './file-inputs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      multi: true,
      provide: NG_VALIDATORS,
      useExisting: FileInputsComponent
    },
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileInputsComponent
    }
  ]
})
export class FileInputsComponent extends BaseFormComponent {
  private readonly cdRef = inject(ChangeDetectorRef);

  readonly directory = input('');
  readonly icon = input('pi pi-plus');
  readonly label = input('Browse');
  readonly max = input<number>(5);
  readonly readonly = input(false);
  readonly onDownloadEmitter = output<FileInput[]>({alias: 'onDownload'});

  onAdd(): void {
    this.formArray.push(
      new FormControl()
    );

    this.cdRef.markForCheck();
  }

  onDelete(index: number): void {
    this.formArray.removeAt(index);

    this.cdRef.markForCheck();
  }

  onDownload(file: FileInput[]): void {
    this.onDownloadEmitter.emit(file);
  }

  override setDisabledState(isDisabled: boolean): void {
    for (const control of this.formArray.controls) {
      if (isDisabled) {
        control.disable();
      } else {
        control.enable();
      }
    }
  }

  override validate(control?: AbstractControl): ValidationErrors | null {
    if (control?.hasValidator(Validators.required) && Array.isArray(control?.value)) {
      const first = control.value[0];

      if (!(
        typeof first === 'string' ||
        (Array.isArray(first) && first.some(({toDelete}) => toDelete === false))
      )) {
        return {
          required: true
        };
      }
    }

    return null;
  }

  override writeValue(value: FileInputsValue): void {
    if (Array.isArray(value)) {
      setTimeout(() => {
        if (value.length === 0) {
          this.onAdd();
        } else {
          for (let i = 0, j = value.length; i < j; i++) {
            this.onAdd();
          }

          this.setValue(value);
        }
      });
    } else if (!this.readonly()) {
      this.onAdd();
    }
  }

  protected override getForm(): FormArray<any> {
    return new FormArray<any>([]);
  }
}

type FileInputsValue = FileInput[][] | null;
