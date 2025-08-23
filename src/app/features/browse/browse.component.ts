import { ViewportScroller } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '@core/services/recipe/recipe.service';
import { Recipe } from '@core/types/recipe';
import { PaginationControlsComponent } from './_ui/pagination-controls/pagination-controls.component';
import { SearchBarComponent } from './_ui/search-bar/search-bar.component';
import { RECIPES_PER_PAGE } from './constants';

@Component({
  selector: 'app-browse',
  imports: [MatIconModule, SearchBarComponent, PaginationControlsComponent],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css',
})
export class BrowseComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private recipeService = inject(RecipeService);
  private viewportScroller = inject(ViewportScroller);

  recipes = signal<Recipe[] | undefined>(undefined);
  errorMessage = signal('');
  sortValue = '';

  ngOnInit(): void {
    this.route.queryParamMap.subscribe({
      next: (paramMap) => {
        const sort = paramMap.get('sort');
        const search = paramMap.get('search');
        const page = parseInt(paramMap.get('page') ?? '1');

        this.viewportScroller.scrollToPosition([0, 0]);

        if (sort && !['most_viewed', 'newest', 'trending'].includes(sort)) {
          this.errorMessage.set('Invalid sort option');
          this.recipes.set(undefined);
          return;
        }

        if (!page) {
          this.errorMessage.set('Invalid page number');
          this.recipes.set(undefined);
          return;
        }

        this.sortValue = sort ?? 'most_viewed';

        this.recipeService
          .getAll({
            sort: sort || undefined,
            search: search || undefined,
            limit: RECIPES_PER_PAGE,
            skip: RECIPES_PER_PAGE * (page - 1),
          })
          .subscribe({
            next: (recipes) => {
              this.recipes.set(recipes);
            },
          });
      },
    });
  }

  onSortChange(event: Event) {
    const element = event.currentTarget as HTMLSelectElement;
    this.router.navigate([], {
      queryParams: { sort: element.value },
      queryParamsHandling: 'merge',
    });
  }
}
