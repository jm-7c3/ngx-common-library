import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileInputsComponent } from './file-inputs.component';

describe('FileInputsComponent', () => {
  let component: FileInputsComponent;
  let fixture: ComponentFixture<FileInputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileInputsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FileInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
