import { Directive, InjectionToken } from '@angular/core';

export const ERROR_DIRECTIVE = new InjectionToken<ErrorDirective>('ErrorDirective');

@Directive({
  selector: 'ff-error',
  standalone: true,
  providers: [
    { provide: ERROR_DIRECTIVE, useExisting: ErrorDirective }
  ]
})
export class ErrorDirective {

}
