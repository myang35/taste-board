import { inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

export class CreateForm {
  private formBuilder = inject(FormBuilder);

  root = this.formBuilder.group({
    name: ['Spaget', [Validators.maxLength(128)]],
    servings: [1, [Validators.max(99)]],
    description: ['Spagetti but with one noodle', [Validators.maxLength(1024)]],
    cookMinutes: [20, [Validators.min(0), Validators.max(9999)]],
    difficulty: [1, [Validators.min(0), Validators.max(5)]],
    image: this.formBuilder.control<File | undefined>(undefined, []),
    ingredients: this.formBuilder.array<
      ReturnType<typeof this.createIngredientGroup>
    >([
      this.createIngredientGroup({
        name: 'noodle',
        amount: 1,
        unit: 'piece',
      }),
      this.createIngredientGroup({
        name: 'plate',
        amount: 1,
        unit: 'whole',
        notes: 'washed',
      }),
    ]),
    instructions: this.formBuilder.array<
      ReturnType<typeof this.createInstructionGroup>
    >([
      this.createInstructionGroup({
        description: 'Put plate on table',
        minutes: 1,
      }),
      this.createInstructionGroup({
        description: 'Put noodle on plate',
        minutes: 2,
      }),
      this.createInstructionGroup({
        description: 'Eat noodle',
        minutes: 10,
      }),
    ]),
    calories: [50, [Validators.min(0), Validators.max(9999)]],
    protein: [1, [Validators.min(0), Validators.max(9999)]],
    carbohydrates: [2, [Validators.min(0), Validators.max(9999)]],
    fat: [3, [Validators.min(0), Validators.max(9999)]],
    fiber: [20, [Validators.min(0), Validators.max(9999)]],
    sugar: [30, [Validators.min(0), Validators.max(9999)]],
    notes: ['Do not forget the noodle', [Validators.maxLength(4096)]],
    shared: ['no'],
  });
  name = this.root.controls.name;
  servings = this.root.controls.servings;
  description = this.root.controls.description;
  cookMinutes = this.root.controls.cookMinutes;
  difficulty = this.root.controls.difficulty;
  image = this.root.controls.image;
  ingredients = this.root.controls.ingredients;
  instructions = this.root.controls.instructions;
  calories = this.root.controls.calories;
  protein = this.root.controls.protein;
  carbohydrates = this.root.controls.carbohydrates;
  fat = this.root.controls.fat;
  fiber = this.root.controls.fiber;
  sugar = this.root.controls.sugar;
  notes = this.root.controls.notes;
  shared = this.root.controls.shared;

  get values() {
    return {
      name: this.name.value ?? '',
      servings: this.servings.value || 0,
      description: this.description.value ?? '',
      cookMinutes: this.cookMinutes.value || 0,
      difficulty: this.difficulty.value || 0,
      image: this.image.value ?? undefined,
      ingredients: (this.ingredients.value ?? []).map((ingredient) => ({
        name: ingredient.name ?? '',
        amount: ingredient.amount || 0,
        unit: ingredient.unit ?? '',
        notes: ingredient.notes ?? '',
      })),
      instructions: (this.instructions.value ?? []).map((instruction) => ({
        description: instruction?.description ?? '',
        minutes: instruction?.minutes || 0,
      })),
      calories: this.calories.value || 0,
      protein: this.protein.value || 0,
      carbohydrates: this.carbohydrates.value || 0,
      fat: this.fat.value || 0,
      fiber: this.fiber.value || 0,
      sugar: this.sugar.value || 0,
      notes: this.notes.value ?? '',
      shared: this.shared.value === 'yes',
    };
  }

  addIngredient() {
    this.root.controls.ingredients.push(this.createIngredientGroup());
  }

  removeIngredient(index: number) {
    this.root.controls.ingredients.removeAt(index);
  }

  addInstruction() {
    this.root.controls.instructions.push(this.createInstructionGroup());
  }

  removeInstruction(index: number) {
    this.root.controls.instructions.removeAt(index);
  }

  private createIngredientGroup(value?: {
    name?: string;
    amount?: number;
    unit?: string;
    notes?: string;
  }) {
    return this.formBuilder.group({
      name: [
        value?.name ?? '',
        [Validators.required, Validators.maxLength(128)],
      ],
      amount: [
        value?.amount ?? NaN,
        [Validators.required, Validators.max(9999)],
      ],
      unit: [
        value?.unit ?? '',
        [Validators.required, Validators.maxLength(32)],
      ],
      notes: [value?.notes ?? '', [Validators.maxLength(32)]],
    });
  }

  private createInstructionGroup(value?: {
    description?: string;
    minutes?: number;
  }) {
    return this.formBuilder.group({
      description: [value?.description ?? '', [Validators.maxLength(1024)]],
      minutes: [value?.minutes ?? NaN, [Validators.max(9999)]],
    });
  }
}
