import { NgModule } from '@angular/core';

import { ErrorDirective } from './error.directive';
import { FormFieldComponent } from './form-field.component';
import { LabelDirective } from './label.directive';

@NgModule({
  exports: [
    ErrorDirective,
    FormFieldComponent,
    LabelDirective,
  ],
  imports: [
    ErrorDirective,
    FormFieldComponent,
    LabelDirective,
  ]
})
export class FormFieldModule { }
