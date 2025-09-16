import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructionAdderComponent } from './instruction-adder.component';

describe('InstructionAdderComponent', () => {
  let component: InstructionAdderComponent;
  let fixture: ComponentFixture<InstructionAdderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructionAdderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructionAdderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
