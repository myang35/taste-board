import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Recipe } from '@core/types/recipe';
import { ImageComponent } from '@shared/ui/image/image.component';

@Component({
  selector: 'app-recipe-card',
  imports: [MatIcon, ImageComponent],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.css',
})
export class RecipeCardComponent {
  readonly recipe = input<Recipe>();
}
