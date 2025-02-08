import { ChangeDetectionStrategy, Component, effect, input, signal }
  from '@angular/core';
import { ButtonModule as PrimengButtonModule } from 'primeng/button';

@Component({
  selector: 'cl-icon-button',
  imports: [
    PrimengButtonModule,
  ],
  templateUrl: './icon-button.component.html',
  styleUrl: './icon-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconButtonComponent {
  readonly disabled = input(false);
  readonly icon = input.required<string>();
  readonly loading = input(false);
  readonly severity = input<Severity>('');
  readonly type = input<'button' | 'submit'>('button');

  readonly class = signal('p-button-icon-only p-button-text');

  constructor() {
    effect(() => {
      this.updateClass(this.severity());
    });
  }

  private updateClass(severity: string) {
    this.class.update(value => value + ' p-button-' + severity);
  }
}

type Severity = '' | 'danger' | 'help' | 'info' | 'secondary' | 'success' | 'warning';
