import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, input, output, signal,
  viewChild } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR }
from '@angular/forms';
import { cloneDeep } from 'lodash-es';
import { ButtonModule } from 'primeng/button';
import { v4 } from 'uuid';

import { ButtonComponent } from '../../controls/button';

@Component({
  selector: 'cl-file-input',
  imports: [
    ButtonComponent,
    ButtonModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './file-input.component.html',
  styleUrl: './file-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileInputComponent,
    }
  ]
})
export class FileInputComponent implements ControlValueAccessor {
  readonly directory = input('');
  readonly icon = input('pi pi-plus');
  readonly label = input('Browse');
  readonly readonly = input(false);
  readonly onDownloadEmitter = output<FileInput[]>({alias: 'onDownload'});
  readonly fileInput = viewChild<ElementRef>('fileInput');

  readonly fileName = signal('');
  readonly isDisabled = signal(false);
  readonly isFileSelected = signal(false);
  readonly value = signal<FileInputValue>(null);

  // ControlValueAccessor interface methods

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    setTimeout(() => {
      this.isDisabled.set(isDisabled);
    });
  }

  writeValue(value: FileInput[] | string | null = null): void {
    let newValue: FileInput[] = [];

    if (Array.isArray(value)) {
      newValue = cloneDeep(value);

      this.selectFile(newValue[0]);
    } else if (typeof value === 'string') {
      const lastSlashPosition = value.lastIndexOf('/');
      const fileName = value.substring(lastSlashPosition + 1, value.length);
      const name = fileName.split('.');

      const file: FileInput = {
        isNew: !value,
        hash: name[1],
        name: fileName,
        path: this.directory(),
        toDelete: false
      };

      newValue.push(file);

      this.selectFile(file);
    }

    this.setValue(newValue);
  }

  // Custom public methods

  onClick(): void {
    this.fileInput()?.nativeElement.click();
    this.onTouched();
  }

  onFileSelected(event: Event): void {
    const file: File = (event.target as HTMLInputElement).files![0];
    const name = file.name.split('.');

    if (file) {
      const hash = v4().split('-')[0];
      const newFile: FileInput = {
        file,
        hash,
        isNew: true,
        name: `${encodeURIComponent(name[0])}.${hash}.${name[1]}`,
        path: this.directory(),
        toDelete: false
      };
      const newValue = [...this.value()!] as FileInput[];

      newValue.push(newFile);

      this.selectFile(newFile);
      this.setValue(newValue);
    }
  }

  onDelete(): void {
    const newValue = [...this.value()!];
    const file = this.getLastFile(newValue);

    if (file) {
      if (file.isNew) {
        newValue.pop();
      } else {
        file.toDelete = true;
      }

      this.fileName.set('');
      this.isFileSelected.set(false);
      this.setValue(newValue);
    }
  }

  onDownload(): void {
    this.onDownloadEmitter.emit(this.value() as FileInput[]);
  }

  // Custom private methods

  private getLastFile(value: FileInput[]): FileInput | undefined {
    return value[value.length - 1];
  }

  private onChange: any = (value: FileInputValue) => {};

  private onTouched: any = () => {};

  private selectFile(file: FileInput): void {
    this.fileName.set(getSafeFileName(file));
    this.isFileSelected.set(true);
  }

  private setValue(value: FileInputValue): void {
    this.value.set(value);

    this.onChange(value);
    this.onTouched();
  }
}

function getSafeFileName(file: FileInput): string {
  const name = file.name.split('.');

  return `${decodeURIComponent(name[0])}.${name[2]}`;
}

export interface FileInput {
  file?: File;
  hash: string;
  isNew: boolean;
  name: string;
  path: string;
  toDelete: boolean;
}

type FileInputValue = FileInput[] | null;
