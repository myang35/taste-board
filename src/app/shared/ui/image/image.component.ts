import { Component, input, linkedSignal } from '@angular/core';

@Component({
  selector: 'app-image',
  imports: [],
  templateUrl: './image.component.html',
  styleUrl: './image.component.css',
})
export class ImageComponent {
  readonly src = input<string>();
  readonly alt = input<string>();
  readonly classProp = input<string>(undefined, { alias: 'class' });

  errored = linkedSignal(() => !this.src());
}
