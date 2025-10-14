import { Component, input } from '@angular/core';
import { User } from '@core/types/user';

@Component({
  selector: 'app-user-image',
  imports: [],
  templateUrl: './user-image.component.html',
  styleUrl: './user-image.component.css',
})
export class UserImageComponent {
  readonly user = input.required<User>();
  readonly classProp = input<string>(undefined, { alias: 'class' });
}
