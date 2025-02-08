import { ChangeDetectionStrategy, Component, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, ControlValueAccessor, FormArray, FormControl, FormGroup,
  ValidationErrors, Validator } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    imports: [CommonModule],
    template: '',
    styles: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseFormComponent implements ControlValueAccessor, OnDestroy,
  Validator {
  readonly control = this.getForm();
  readonly disabled = signal(false);
  protected readonly subscription = new Subscription();

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // Control Value Accessor methods

  registerOnChange(fn: any): void {
    this.subscription.add(
      this.control.valueChanges.subscribe(fn)
    );
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }

    setTimeout(() => {
      this.disabled.set(isDisabled);
    });
  }

  writeValue(obj: any): void {
    if (obj) {
      this.setValue(obj);
    }
  }

  // Validator methods

  validate(control?: AbstractControl): ValidationErrors | null {
    if (this.control.invalid) {
      return { invalid: true };
    }

    return null;
  }

  // Custom protected methods

  protected getForm(): FormArray | FormControl | FormGroup {
    throw new Error('Not implemented.');
  }

  protected setValue(value: any): void {
    this.control.patchValue(value);

    this.onChanged(value);
    this.onTouched();
  }

  // Custom private methods

  private onChanged: any = (value: any) => {};

  private onTouched: any = () => {};

  // Getters and setters

  get formArray(): FormArray {
    return this.control as FormArray;
  }

  get formControl(): FormControl {
    return this.control as FormControl;
  }

  get formGroup(): FormGroup {
    return this.control as FormGroup;
  }
}
