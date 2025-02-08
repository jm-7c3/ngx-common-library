import { ChangeDetectionStrategy, Component, forwardRef, inject, input, signal }
  from '@angular/core';
import { FormControl, FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR,
  ReactiveFormsModule } from '@angular/forms';
import { BaseFormComponent, FieldOption } from 'common-lib';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';

import { SpQueryConfig } from '../../models';
import { SpUsersService } from '../../services';

@Component({
  selector: 'cl-sp-siteusers-input',
  imports: [
    AutoCompleteModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './sp-siteusers-input.component.html',
  styleUrl: './sp-siteusers-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      multi: true,
      provide: NG_VALIDATORS,
      useExisting: SpSiteusersInputComponent,
    },
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SpSiteusersInputComponent),
    }
  ]
})
export class SpSiteusersInputComponent extends BaseFormComponent {
  private readonly spUsersService = inject(SpUsersService);

  readonly appendTo = input('body');
  readonly fieldName = input('Title');
  readonly fieldValue = input('Id');
  readonly forceSelection = input(true);
  readonly maxlength = input(25);
  readonly minLength = input(3);
  readonly placeholder = input('');
  readonly styleClass = input('');

  readonly suggestions = signal<FieldOption[]>([]);

  onComplete({query}: AutoCompleteCompleteEvent): void {
    const config: SpQueryConfig = {
      filter: [
        {
          field: this.fieldName(),
          stringOperator: 'startswith',
          value: query
        }
      ],
      select: [this.fieldName(), this.fieldValue()]
    };

    this.subscription.add(
      this.spUsersService.siteUsers(config).subscribe(results => {
        const newSuggestions: FieldOption[] = [];

        for (const result of results) {
          newSuggestions.push({
            label: (result as any)[this.fieldName()],
            value: (result as any)[this.fieldValue()]
          });
        }

        this.suggestions.set(newSuggestions);
      })
    );
  }

  protected override getForm(): FormControl {
    return new FormControl();
  }
}
