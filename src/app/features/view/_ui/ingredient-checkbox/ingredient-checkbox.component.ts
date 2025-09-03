import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Ingredient } from '@core/types/ingredient';

@Component({
  selector: 'app-ingredient-checkbox',
  imports: [FormsModule],
  templateUrl: './ingredient-checkbox.component.html',
  styleUrl: './ingredient-checkbox.component.css',
})
export class IngredientCheckboxComponent {
  ingredient = input.required<Ingredient>();

  checked = false;
}
