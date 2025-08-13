import { Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '@core/services/auth/auth.service';
import { RecipeService } from '@core/services/recipe/recipe.service';
import { Recipe } from '@core/types/recipe';
import { SearchBarComponent } from './_ui/search-bar/search-bar.component';

@Component({
  selector: 'app-recipes',
  imports: [MatIconModule, SearchBarComponent],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
})
export class RecipesComponent {
  private authService = inject(AuthService);
  private recipeService = inject(RecipeService);

  recipes = signal<Recipe[] | undefined>(undefined);
  errorMessage = signal('');

  ngOnInit(): void {
    this.recipeService
      .getAll({ userId: this.authService.user()?.id })
      .subscribe({
        next: (recipes) => {
          this.recipes.set(recipes);
        },
      });
  }

  onSearchSubmit(query: string) {
    this.recipeService
      .getAll({
        userId: this.authService.user()?.id,
        search: query || undefined,
      })
      .subscribe({
        next: (recipes) => {
          this.recipes.set(recipes);
        },
      });
  }
}
