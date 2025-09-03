import { Component, input } from '@angular/core';

@Component({
  selector: 'app-instruction-card',
  imports: [],
  templateUrl: './instruction-card.component.html',
  styleUrl: './instruction-card.component.css',
})
export class InstructionCardComponent {
  seqNumber = input.required<number>();
  instruction = input.required<string>();

  checked = false;
}
