import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Instruction } from '@core/types/instruction';
import { DurationPipe } from '@shared/pipes/duration/duration.pipe';

@Component({
  selector: 'app-instruction-card',
  imports: [MatIcon, DurationPipe],
  templateUrl: './instruction-card.component.html',
  styleUrl: './instruction-card.component.css',
})
export class InstructionCardComponent {
  seqNumber = input.required<number>();
  instruction = input.required<Instruction>();

  checked = false;
}
