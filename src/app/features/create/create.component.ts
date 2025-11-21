import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { RecipeService } from '@core/services/recipe/recipe.service';
import { Recipe } from '@core/types/recipe';
import { FieldErrorComponent } from '@shared/ui/field-error/field-error.component';
import { FormErrorComponent } from '@shared/ui/form-error/form-error.component';
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
    FieldErrorComponent,
    FormErrorComponent,
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
  protected formErrorMessage = signal('');
  protected inputErrorMessages = signal<Record<string, string>>({});

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
          error: () => {
            this.editedRecipe.set(null);
          },
        });
      },
    });
  }

  createRecipe() {
    this.form.submitCreate().subscribe({
      next: (value) => {
        this.router.navigateByUrl(`/view/${value.id}`);
      },
      error: () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    });
  }

  updateRecipe() {
    const recipeId = this.editedRecipe()?.id;

    if (!recipeId) return;

    this.form.submitUpdate(recipeId).subscribe({
      next: () => {
        this.router.navigateByUrl(`/view/${recipeId}`);
      },
    });
  }
}
