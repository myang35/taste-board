import { Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { CreateForm } from '@features/create/_utils/create-form/create-form';

@Component({
  selector: 'app-ingredient-selector',
  imports: [ReactiveFormsModule, MatIcon],
  templateUrl: './ingredient-selector.component.html',
  styleUrl: './ingredient-selector.component.css',
})
export class IngredientSelectorComponent {
  readonly form = input.required<CreateForm>();
}
