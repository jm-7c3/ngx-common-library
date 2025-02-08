import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpAutocompleteInputComponent } from './sp-autocomplete-input.component';

describe('SpAutocompleteInputComponent', () => {
  let component: SpAutocompleteInputComponent;
  let fixture: ComponentFixture<SpAutocompleteInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpAutocompleteInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpAutocompleteInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
