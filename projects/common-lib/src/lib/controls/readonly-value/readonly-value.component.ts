import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'cl-readonly-value',
  imports: [],
  templateUrl: './readonly-value.component.html',
  styleUrl: './readonly-value.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReadonlyValueComponent {
  readonly label = input<string>();
  readonly value = input<any>();
}
