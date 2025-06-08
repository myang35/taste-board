import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '@core/services/recipe/recipe.service';
import { Recipe } from '@core/types/recipe';
import { RequestManager } from '@shared/utils/request-manager';

@Component({
  selector: 'app-view',
  imports: [DatePipe],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css',
})
export class ViewComponent implements OnInit {
  private recipeService = inject(RecipeService);
  private activatedRoute = inject(ActivatedRoute);

  recipeManager?: RequestManager<Recipe | null>;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (paramMap) => {
        const recipeId = paramMap.get('recipeId');
        if (recipeId) {
          this.recipeManager = new RequestManager(
            this.recipeService.get(recipeId),
          );
        }
      },
    });
  }
}
