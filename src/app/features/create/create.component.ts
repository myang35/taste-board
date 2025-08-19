import { Component, inject, viewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { RecipeService } from '@core/services/recipe/recipe.service';
import { TabGroupComponent } from '@shared/ui/tabs/tab-group/tab-group.component';
import { TabsModule } from '@shared/ui/tabs/tabs.module';

@Component({
  selector: 'app-create',
  imports: [TabsModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private recipeService = inject(RecipeService);

  tabGroup = viewChild.required<TabGroupComponent>('tabGroup');
  form = this.formBuilder.group({
    name: ['', [Validators.maxLength(128)]],
    description: ['', [Validators.maxLength(1024)]],
    prepMinutes: [0, [Validators.min(0), Validators.max(9999)]],
    calories: [0, [Validators.min(0), Validators.max(9999)]],
    tags: this.formBuilder.array<ReturnType<typeof this.createTagControl>>([]),
    ingredients: this.formBuilder.array<
      ReturnType<typeof this.createIngredientGroup>
    >([]),
    steps: this.formBuilder.array<ReturnType<typeof this.createStepControl>>(
      [],
    ),
    notes: ['', [Validators.maxLength(4096)]],
    shared: ['no'],
  });

  get ingredients() {
    return this.form.get('ingredients') as FormArray<
      ReturnType<typeof this.createIngredientGroup>
    >;
  }

  get steps() {
    return this.form.get('steps') as FormArray;
  }

  get tags() {
    return this.form.get('tags') as FormArray;
  }

  onFormSubmit() {
    const values = {
      name: this.form.controls.name.value ?? '',
      description: this.form.controls.description.value ?? '',
      prepMinutes: this.form.controls.prepMinutes.value ?? 0,
      calories: this.form.controls.calories.value ?? 0,
      tags: (this.form.controls.tags.value ?? []).filter(
        (tag) => tag,
      ) as string[],
      ingredients: (this.form.controls.ingredients.value ?? []).map(
        (ingredient) => ({
          name: ingredient.name ?? '',
          amount: ingredient.amount ?? 0,
          unit: ingredient.unit ?? '',
        }),
      ),
      steps: (this.form.controls.steps.value ?? []).filter(
        (step) => step,
      ) as string[],
      notes: this.form.controls.notes.value ?? '',
      shared: this.form.controls.shared.value === 'yes',
    };

    this.recipeService.create(values).subscribe({
      next: (value) => {
        this.router.navigateByUrl(`/view/${value.id}`);
      },
    });
  }

  onNextClick() {
    this.tabGroup().selectedIndex.set(this.tabGroup().selectedIndex() + 1);
  }

  onBackClick() {
    this.tabGroup().selectedIndex.set(this.tabGroup().selectedIndex() - 1);
  }

  addIngredient() {
    this.ingredients.push(this.createIngredientGroup());
  }

  deleteIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  addStep() {
    this.steps.push(this.createStepControl());
  }

  deleteStep(index: number) {
    this.steps.removeAt(index);
  }

  addTag() {
    this.tags.push(this.createTagControl());
  }

  deleteTag(index: number) {
    this.tags.removeAt(index);
  }

  private createIngredientGroup() {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(128)]],
      amount: [0, [Validators.max(9999)]],
      unit: ['', [Validators.maxLength(32)]],
    });
  }

  private createStepControl() {
    return this.formBuilder.control('', [Validators.maxLength(1024)]);
  }

  private createTagControl() {
    return this.formBuilder.control('', [Validators.maxLength(32)]);
  }
}
