import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '@core/services/recipe/recipe.service';
import { Recipe } from '@core/types/recipe';
import { SearchBarComponent } from './ui/search-bar/search-bar.component';
import { SortButtonComponent } from './ui/sort-button/sort-button.component';

@Component({
  selector: 'app-browse',
  imports: [MatIconModule, SortButtonComponent, SearchBarComponent],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css',
})
export class BrowseComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private recipeService = inject(RecipeService);

  recipes = signal<Recipe[] | undefined>(undefined);
  errorMessage = signal('');

  ngOnInit(): void {
    this.route.queryParamMap.subscribe({
      next: (paramMap) => {
        const sort = paramMap.get('sort');
        const search = paramMap.get('search');

        if (sort && !['most_viewed', 'newest', 'trending'].includes(sort)) {
          this.errorMessage.set('Invalid sort option');
          this.recipes.set(undefined);
          return;
        }

        this.recipeService
          .getAll({
            sort: sort || undefined,
            search: search || undefined,
          })
          .subscribe({
            next: (recipes) => {
              this.recipes.set(recipes);
            },
          });
      },
    });
  }
}
