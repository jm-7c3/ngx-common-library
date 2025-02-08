import { Directive, InjectionToken } from '@angular/core';

export const LABEL_DIRECTIVE = new InjectionToken<LabelDirective>('LabelDirective');

@Directive({
  selector: 'ff-label',
  standalone: true,
  providers: [
    { provide: LABEL_DIRECTIVE, useExisting: LabelDirective }
  ]
})
export class LabelDirective {

}
