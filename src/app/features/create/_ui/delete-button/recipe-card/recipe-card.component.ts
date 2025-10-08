import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Recipe } from '@core/types/recipe';

@Component({
  selector: 'app-recipe-card',
  imports: [MatIcon],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.css',
})
export class RecipeCardComponent {
  readonly recipe = input.required<Recipe>();

  isoToString(iso: string) {
    const date = new Date(iso);
    return date.toLocaleString('en-us', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }
}
