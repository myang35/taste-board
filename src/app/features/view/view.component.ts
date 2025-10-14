import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { RecipeService } from '@core/services/recipe/recipe.service';
import { Recipe } from '@core/types/recipe';
import { UserImageComponent } from '@shared/ui/user-image/user-image.component';
import { RequestManager } from '@shared/utils/request-manager';
import { StringUtils } from '@shared/utils/string-utils/string-utils';
import { tap } from 'rxjs';
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
export class ViewComponent implements OnInit, OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly recipeService = inject(RecipeService);
  private readonly activatedRoute = inject(ActivatedRoute);

  protected StringUtils = StringUtils;
  protected recipeManager?: RequestManager<Recipe | null>;
  protected user = this.authService.user;

  private addViewTimeout?: ReturnType<typeof setTimeout>;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (paramMap) => {
        const recipeId = paramMap.get('recipeId');
        if (recipeId) {
          this.recipeManager = new RequestManager(
            this.recipeService.get(recipeId).pipe(
              tap({
                next: (value) => {
                  if (!value) return;
                  this.addViewTimeout = setTimeout(
                    () =>
                      this.recipeService
                        .addView(value.id, this.user()?.id)
                        .subscribe(),
                    10000,
                  );
                },
              }),
            ),
          );
        }
      },
    });
  }

  ngOnDestroy(): void {
    clearTimeout(this.addViewTimeout);
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
