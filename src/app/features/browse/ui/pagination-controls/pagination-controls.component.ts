import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '@core/services/recipe/recipe.service';
import { RECIPES_PER_PAGE } from '@features/browse/constants';
import { concatMap, map, of, tap } from 'rxjs';

@Component({
  selector: 'app-pagination-controls',
  imports: [AsyncPipe],
  templateUrl: './pagination-controls.component.html',
  styleUrl: './pagination-controls.component.css',
})
export class PaginationControlsComponent {
  private recipeService = inject(RecipeService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  lastSearch?: string;
  lastMaxPage?: number;
  maxPage$ = this.route.queryParamMap.pipe(
    concatMap((paramMap) => {
      const search = paramMap.get('search') ?? '';
      if (this.lastSearch === search) return of(this.lastMaxPage);

      this.lastSearch = search;

      return this.recipeService.count({ search: search || undefined }).pipe(
        map((count) => Math.ceil(count / RECIPES_PER_PAGE)),
        tap((maxPage) => (this.lastMaxPage = maxPage)),
      );
    }),
  );
  page$ = this.route.queryParamMap.pipe(
    map((value) => parseInt(value.get('page') ?? '1')),
  );

  async setPage(page: number) {
    this.router.navigate([], {
      queryParams: { page },
      queryParamsHandling: 'merge',
    });
  }
}
