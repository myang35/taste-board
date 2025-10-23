import { Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { CreateForm } from '@features/create/_utils/create-form/create-form';
import { FieldErrorComponent } from '@shared/ui/field-error/field-error.component';

@Component({
  selector: 'app-ingredient-selector',
  imports: [ReactiveFormsModule, MatIcon, FieldErrorComponent],
  templateUrl: './ingredient-selector.component.html',
  styleUrl: './ingredient-selector.component.css',
})
export class IngredientSelectorComponent {
  readonly form = input.required<CreateForm>();
}
