import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpSiteusersInputComponent } from './sp-siteusers-input.component';

describe('SpSiteusersInputComponent', () => {
  let component: SpSiteusersInputComponent;
  let fixture: ComponentFixture<SpSiteusersInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpSiteusersInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpSiteusersInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
