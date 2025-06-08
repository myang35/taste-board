import { Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
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
  private recipeService = inject(RecipeService);

  recipes = signal<Recipe[] | undefined>(undefined);
  errorMessage = signal('');

  ngOnInit(): void {
    this.recipeService.getAll().subscribe({
      next: (recipes) => {
        this.recipes.set(recipes);
      },
    });
  }

  onSearchSubmit(query: string) {
    console.log('query:', query);
    this.recipeService
      .getAll({
        search: query || undefined,
      })
      .subscribe({
        next: (recipes) => {
          this.recipes.set(recipes);
        },
      });
  }
}
