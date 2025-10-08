import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { RecipeService } from '@core/services/recipe/recipe.service';
import { Recipe } from '@core/types/recipe';
import { TabsModule } from '@shared/ui/tabs/tabs.module';
import { DeleteButtonComponent } from './_ui/delete-button/delete-button.component';
import { ImageUploaderComponent } from './_ui/image-uploader/image-uploader.component';
import { IngredientSelectorComponent } from './_ui/ingredient-selector/ingredient-selector.component';
import { InstructionAdderComponent } from './_ui/instruction-adder/instruction-adder.component';
import { CreateForm } from './_utils/create-form/create-form';

@Component({
  selector: 'app-create',
  imports: [
    TabsModule,
    ReactiveFormsModule,
    MatIconModule,
    ImageUploaderComponent,
    IngredientSelectorComponent,
    InstructionAdderComponent,
    DeleteButtonComponent,
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly recipeService = inject(RecipeService);
  private readonly authService = inject(AuthService);

  protected form = new CreateForm();
  protected urlParams = { editRecipe: '' };
  protected editedRecipe = signal<Recipe | undefined | null>(undefined);
  protected user = this.authService.user;

  ngOnInit(): void {
    this.route.queryParamMap.subscribe({
      next: (paramMap) => {
        this.urlParams.editRecipe = paramMap.get('editRecipe') ?? '';

        if (!this.urlParams.editRecipe) return;

        this.recipeService.get(this.urlParams.editRecipe).subscribe({
          next: (value) => {
            this.editedRecipe.set(value);

            if (!value) return;

            this.form.updateFromRecipe(value);
          },
          error: (err) => {
            this.editedRecipe.set(null);
          },
        });
      },
    });
  }

  /**
   * For testing only. Remove before production!
   */
  autofillForm() {
    this.form.update({
      name: 'Spaget',
      servings: 1,
      description: 'Spagetti but with one noodle',
      cookMinutes: 20,
      difficulty: 1,
      image: undefined,
      ingredients: [
        {
          name: 'noodle',
          amount: 1,
          unit: 'piece',
        },
        {
          name: 'plate',
          amount: 1,
          unit: 'whole',
          notes: 'washed',
        },
      ],
      instructions: [
        {
          description: 'Put plate on table',
          minutes: 1,
        },
        {
          description: 'Put noodle on plate',
          minutes: 2,
        },
        {
          description: 'Eat noodle',
          minutes: 10,
        },
      ],
      calories: 50,
      protein: 1,
      carbohydrates: 2,
      fat: 3,
      fiber: 20,
      sugar: 30,
      notes: 'Do not forget the noodle',
      shared: 'no',
    });
  }

  createRecipe() {
    this.recipeService.create(this.form.values).subscribe({
      next: (value) => {
        this.router.navigateByUrl(`/view/${value.id}`);
      },
    });
  }

  updateRecipe() {
    const recipeId = this.editedRecipe()?.id;

    if (!recipeId) return;

    this.recipeService.update(recipeId, this.form.values).subscribe({
      next: (value) => {
        this.router.navigateByUrl(`/view/${value.id}`);
      },
    });
  }
}
