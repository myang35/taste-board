import { Component, inject, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { RecipeService } from '@core/services/recipe/recipe.service';
import { Recipe } from '@core/types/recipe';
import { UserImageComponent } from '@shared/ui/user-image/user-image.component';
import { RequestManager } from '@shared/utils/request-manager';
import { StringUtils } from '@shared/utils/string-utils/string-utils';
import { IngredientCheckboxComponent } from './_ui/ingredient-checkbox/ingredient-checkbox.component';
import { InstructionCardComponent } from './_ui/instruction-card/instruction-card.component';

@Component({
  selector: 'app-view',
  imports: [
    MatIcon,
    IngredientCheckboxComponent,
    InstructionCardComponent,
    UserImageComponent,
  ],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css',
})
export class ViewComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly recipeService = inject(RecipeService);
  private readonly activatedRoute = inject(ActivatedRoute);

  protected StringUtils = StringUtils;
  protected recipeManager?: RequestManager<Recipe | null>;
  protected user = this.authService.user;

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

  difficultyToString(difficulty: number) {
    switch (difficulty) {
      case 1:
        return 'Very Easy';
      case 2:
        return 'Easy';
      case 3:
        return 'Medium';
      case 4:
        return 'Hard';
      case 5:
        return 'Very Hard';
      default:
        return 'Not Rated';
    }
  }
}
