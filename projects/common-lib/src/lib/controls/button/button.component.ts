import { ChangeDetectionStrategy, Component, effect, input, signal }
  from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule as PrimengButtonModule } from 'primeng/button';

import { ButtonColor } from './button.models';

@Component({
  selector: 'cl-button',
  imports: [
    CommonModule,
    PrimengButtonModule
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  readonly color = input<ButtonColor>('primary');
  readonly disabled = input(false);
  readonly icon = input<string>();
  readonly label = input<string>();
  readonly loading = input(false);
  readonly type = input<'button' | 'submit'>('button');

  readonly buttonClass = signal('');

  constructor() {
    effect(() => {
      switch (this.color()) {
        case 'danger':
          this.buttonClass.set('p-button-danger p-button-raised p-button-text');
          break;
        case 'main':
          this.buttonClass.set('p-button-primary p-button-raised');
          break;
        case 'primary':
          this.buttonClass.set('p-button-primary p-button-raised p-button-text');
          break;
        case 'secondary':
          this.buttonClass.set('p-button-secondary p-button-raised p-button-text');
          break;
      }
    });
  }
}
