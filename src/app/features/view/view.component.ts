import { Component, inject, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '@core/services/recipe/recipe.service';
import { Recipe } from '@core/types/recipe';
import { RequestManager } from '@shared/utils/request-manager';
import { StringUtils } from '@shared/utils/string-utils/string-utils';
import { IngredientCheckboxComponent } from './_ui/ingredient-checkbox/ingredient-checkbox.component';
import { InstructionCardComponent } from './_ui/instruction-card/instruction-card.component';

@Component({
  selector: 'app-view',
  imports: [MatIcon, IngredientCheckboxComponent, InstructionCardComponent],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css',
})
export class ViewComponent implements OnInit {
  private recipeService = inject(RecipeService);
  private activatedRoute = inject(ActivatedRoute);

  StringUtils = StringUtils;

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
