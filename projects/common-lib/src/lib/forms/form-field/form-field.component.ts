import { Component, InjectionToken, ViewEncapsulation, computed, contentChild }
  from '@angular/core';
import { FormControlName, Validators } from '@angular/forms';

export const FORM_FIELD = new InjectionToken<FormFieldComponent>('FormFieldComponent');

@Component({
  selector: 'cl-form-field',
  imports: [],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: FORM_FIELD, useExisting: FormFieldComponent }
  ]
})
export class FormFieldComponent {
  readonly control = contentChild(FormControlName);

  readonly isRequired = computed(() =>
    this.control()?.control.hasValidator(Validators.required) ?? false
  );
}
