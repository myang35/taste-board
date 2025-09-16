import { Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { CreateForm } from '@features/create/_utils/create-form/create-form';

@Component({
  selector: 'app-instruction-adder',
  imports: [ReactiveFormsModule, MatIcon],
  templateUrl: './instruction-adder.component.html',
  styleUrl: './instruction-adder.component.css',
})
export class InstructionAdderComponent {
  readonly form = input.required<CreateForm>();
}
