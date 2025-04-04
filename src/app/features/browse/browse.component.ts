import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '@core/services/recipe/recipe.service';
import { Recipe } from '@core/types/recipe';
import { SortButtonComponent } from './ui/sort-button/sort-button.component';

@Component({
  selector: 'app-browse',
  imports: [MatIconModule, SortButtonComponent],
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
        if (sort) {
          this.recipeService.getAll({ sort }).subscribe({
            next: (recipes) => {
              this.recipes.set(recipes);
            },
          });
        }
      },
    });
  }
}
