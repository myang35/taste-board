import { Component, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from '@core/services/recipe/recipe.service';
import { Recipe } from '@core/types/recipe';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';

@Component({
  selector: 'app-delete-button',
  imports: [RecipeCardComponent],
  templateUrl: './delete-button.component.html',
  styleUrl: './delete-button.component.css',
})
export class DeleteButtonComponent {
  private readonly recipeService = inject(RecipeService);
  private readonly router = inject(Router);

  readonly recipe = input.required<Recipe>();

  protected showConfirmModal = signal(false);

  deleteRecipe() {
    const recipeId = this.recipe()?.id;

    if (!recipeId) return;

    this.recipeService.delete(recipeId).subscribe({
      next: () => {
        this.router.navigateByUrl(`/account/recipes`);
      },
    });
  }
}
