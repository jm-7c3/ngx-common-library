import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadonlyValueComponent } from './readonly-value.component';

describe('ReadonlyValueComponent', () => {
  let component: ReadonlyValueComponent;
  let fixture: ComponentFixture<ReadonlyValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadonlyValueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadonlyValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
