import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { RecipeService } from '@core/services/recipe/recipe.service';
import { TabsModule } from '@shared/ui/tabs/tabs.module';
import { ImageUploaderComponent } from './_ui/image-uploader/image-uploader.component';
import { IngredientSelectorComponent } from './_ui/ingredient-selector/ingredient-selector.component';
import { InstructionAdderComponent } from './_ui/instruction-adder/instruction-adder.component';
import { TagSelectorComponent } from './_ui/tag-selector/tag-selector.component';
import { CreateForm } from './_utils/create-form/create-form';

@Component({
  selector: 'app-create',
  imports: [
    TabsModule,
    ReactiveFormsModule,
    MatIconModule,
    ImageUploaderComponent,
    TagSelectorComponent,
    IngredientSelectorComponent,
    InstructionAdderComponent,
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent {
  private readonly router = inject(Router);
  private readonly recipeService = inject(RecipeService);

  protected form = new CreateForm();

  createRecipe() {
    console.log('values:', this.form.values);

    // this.recipeService.create(values).subscribe({
    //   next: (value) => {
    //     this.router.navigateByUrl(`/view/${value.id}`);
    //   },
    // });
  }
}
