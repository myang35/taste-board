import { Component, input, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { CreateForm } from '@features/create/_utils/create-form/create-form';
import { DurationPipe } from '@shared/pipes/duration/duration.pipe';

@Component({
  selector: 'app-instruction-adder',
  imports: [ReactiveFormsModule, MatIcon, DurationPipe],
  templateUrl: './instruction-adder.component.html',
  styleUrl: './instruction-adder.component.css',
})
export class InstructionAdderComponent implements OnInit {
  readonly form = input.required<CreateForm>();

  protected minuteValues = signal<number[]>([]);
  protected totalMinutes = signal(0);

  ngOnInit(): void {
    this.minuteValues.set(
      this.form().instructions.controls.map(
        (instruction) => instruction.controls.minutes.value ?? 0,
      ),
    );
    this.updateTotalTime();
  }

  addInstruction() {
    this.form().addInstruction();
    this.minuteValues().push(0);
    this.updateTotalTime();
  }

  removeInstruction(index: number) {
    this.form().removeInstruction(index);
    this.minuteValues().splice(index, 1);
    this.updateTotalTime();
  }

  onMinutesInput(e: Event, index: number) {
    const input = e.currentTarget as HTMLInputElement;
    this.minuteValues()[index] = Number.parseInt(input.value) || 0;
    this.updateTotalTime();
  }

  updateTotalTime() {
    this.totalMinutes.set(
      this.minuteValues().reduce((previous, current) => previous + current, 0),
    );
  }
}
