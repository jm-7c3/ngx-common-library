import { ChangeDetectionStrategy, Component, forwardRef, inject, input,
  signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR,
  ReactiveFormsModule } from '@angular/forms';
  import { BaseFormComponent } from '@jm-7c3/common-lib';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';

import { SpQueryConfig } from '../../models';
import { SpListsService } from '../../services';

@Component({
  selector: 'cl-sp-autocomplete-input',
  imports: [
    AutoCompleteModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './sp-autocomplete-input.component.html',
  styleUrl: './sp-autocomplete-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      multi: true,
      provide: NG_VALIDATORS,
      useExisting: SpAutocompleteInputComponent,
    },
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SpAutocompleteInputComponent),
    }
  ]
})
export class SpAutocompleteInputComponent extends BaseFormComponent {
  private readonly spListsService = inject(SpListsService);

  readonly appendTo = input('body');
  readonly fieldName = input('Title');
  readonly forceSelection = input(true);
  readonly listName = input.required<string>();
  readonly maxlength = input(25);
  readonly minLength = input(3);
  readonly placeholder = input('');

  readonly suggestions = signal<string[]>([]);

  onComplete({query}: AutoCompleteCompleteEvent): void {
    const config: SpQueryConfig = {
      filter: [
        {
          field: this.fieldName(),
          stringOperator: 'startswith',
          value: query
        }
      ],
      select: [this.fieldName()]
    };

    this.subscription.add(
      this.spListsService.query(this.listName(), config).subscribe(results => {
        const newSuggestions: string[] = [];

        for (const result of results) {
          newSuggestions.push((result as any)[this.fieldName()]);
        }

        this.suggestions.set(newSuggestions);
      })
    );
  }

  // This is a temporary fix for a PrimeNG issue
  optionValueFn(option: any): any {
    return option;
  }

  protected override getForm(): FormControl {
    return new FormControl();
  }
}
