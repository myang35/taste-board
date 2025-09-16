import { inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

export class CreateForm {
  private formBuilder = inject(FormBuilder);

  root = this.formBuilder.group({
    name: ['', [Validators.maxLength(128)]],
    servings: [NaN, [Validators.max(99)]],
    description: ['', [Validators.maxLength(1024)]],
    prepMinutes: [NaN, [Validators.min(0), Validators.max(9999)]],
    cookMinutes: [NaN, [Validators.min(0), Validators.max(9999)]],
    difficulty: [0, [Validators.min(0), Validators.max(5)]],
    image: this.formBuilder.control<File | undefined>(undefined, []),
    tags: this.formBuilder.array<ReturnType<typeof this.createTagControl>>([]),
    ingredients: this.formBuilder.array<
      ReturnType<typeof this.createIngredientGroup>
    >([]),
    instructions: this.formBuilder.array<
      ReturnType<typeof this.createInstructionGroup>
    >([]),
    calories: [NaN, [Validators.min(0), Validators.max(9999)]],
    protein: [NaN, [Validators.min(0), Validators.max(9999)]],
    carbohydrates: [NaN, [Validators.min(0), Validators.max(9999)]],
    fat: [NaN, [Validators.min(0), Validators.max(9999)]],
    fiber: [NaN, [Validators.min(0), Validators.max(9999)]],
    sugar: [NaN, [Validators.min(0), Validators.max(9999)]],
    notes: ['', [Validators.maxLength(4096)]],
    shared: ['no'],
  });
  name = this.root.controls.name;
  servings = this.root.controls.servings;
  description = this.root.controls.description;
  prepMinutes = this.root.controls.prepMinutes;
  cookMinutes = this.root.controls.cookMinutes;
  difficulty = this.root.controls.difficulty;
  image = this.root.controls.image;
  tags = this.root.controls.tags;
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
      prepMinutes: this.prepMinutes.value || 0,
      cookMinutes: this.cookMinutes.value || 0,
      difficulty: this.difficulty.value || 0,
      image: this.image.value ?? undefined,
      tags: (this.tags.value ?? []).filter((tag) => tag) as string[],
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

  addTag() {
    this.root.controls.tags.push(this.createTagControl());
  }

  removeTag(index: number) {
    this.root.controls.tags.removeAt(index);
  }

  private createIngredientGroup() {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(128)]],
      amount: [NaN, [Validators.required, Validators.max(9999)]],
      unit: ['', [Validators.required, Validators.maxLength(32)]],
      notes: ['', [Validators.maxLength(32)]],
    });
  }

  private createInstructionGroup() {
    return this.formBuilder.group({
      description: ['', [Validators.maxLength(1024)]],
      minutes: [NaN, [Validators.max(9999)]],
    });
  }

  private createTagControl() {
    return this.formBuilder.control('', [Validators.maxLength(32)]);
  }
}
