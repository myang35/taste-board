import { inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Recipe } from '@core/types/recipe';

export class CreateForm {
  private formBuilder = inject(FormBuilder);

  root: ReturnType<typeof this.createRoot>;

  constructor(values?: {
    name?: string;
    servings?: number;
    description?: string;
    cookMinutes?: number;
    difficulty?: number;
    image?: File;
    ingredients?: {
      name?: string;
      amount?: number;
      unit?: string;
      notes?: string;
    }[];
    instructions?: {
      description?: string;
      minutes?: number;
    }[];
    calories?: number;
    protein?: number;
    carbohydrates?: number;
    fat?: number;
    fiber?: number;
    sugar?: number;
    notes?: string;
    shared?: string;
  }) {
    this.root = this.createRoot(values);
  }

  static fromRecipe(recipe: Recipe) {
    return new CreateForm({
      name: recipe.name,
      servings: recipe.servings,
      description: recipe.description,
      cookMinutes: recipe.cookMinutes,
      difficulty: recipe.difficulty,
      image: undefined, // TODO: get image from recipe.imageURL
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      calories: recipe.calories,
      protein: recipe.proteinGrams,
      carbohydrates: recipe.carbohydratesGrams,
      fat: recipe.fatGrams,
      fiber: recipe.fiberGrams,
      sugar: recipe.sugarGrams,
      notes: recipe.notes,
      shared: recipe.shared ? 'yes' : 'no',
    });
  }

  get name() {
    return this.root.controls.name;
  }

  get servings() {
    return this.root.controls.servings;
  }

  get description() {
    return this.root.controls.description;
  }

  get cookMinutes() {
    return this.root.controls.cookMinutes;
  }

  get difficulty() {
    return this.root.controls.difficulty;
  }

  get image() {
    return this.root.controls.image;
  }

  get ingredients() {
    return this.root.controls.ingredients;
  }

  get instructions() {
    return this.root.controls.instructions;
  }

  get calories() {
    return this.root.controls.calories;
  }

  get protein() {
    return this.root.controls.protein;
  }

  get carbohydrates() {
    return this.root.controls.carbohydrates;
  }

  get fat() {
    return this.root.controls.fat;
  }

  get fiber() {
    return this.root.controls.fiber;
  }

  get sugar() {
    return this.root.controls.sugar;
  }

  get notes() {
    return this.root.controls.notes;
  }

  get shared() {
    return this.root.controls.shared;
  }

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

  update(values: {
    name?: string;
    servings?: number;
    description?: string;
    cookMinutes?: number;
    difficulty?: number;
    image?: File;
    ingredients?: {
      name?: string;
      amount?: number;
      unit?: string;
      notes?: string;
    }[];
    instructions?: {
      description?: string;
      minutes?: number;
    }[];
    calories?: number;
    protein?: number;
    carbohydrates?: number;
    fat?: number;
    fiber?: number;
    sugar?: number;
    notes?: string;
    shared?: string;
  }) {
    if (values.name) {
      this.root.controls.name.setValue(values.name);
    }
    if (values.servings) {
      this.root.controls.servings.setValue(values.servings);
    }
    if (values.description) {
      this.root.controls.description.setValue(values.description);
    }
    if (values.cookMinutes) {
      this.root.controls.cookMinutes.setValue(values.cookMinutes);
    }
    if (values.difficulty) {
      this.root.controls.difficulty.setValue(values.difficulty);
    }
    if (values.image) {
      this.root.controls.image.setValue(values.image);
    }
    if (values.ingredients) {
      this.root.controls.ingredients.clear();
      for (const ingredient of values.ingredients) {
        this.root.controls.ingredients.push(
          this.createIngredientGroup(ingredient),
        );
      }
    }
    if (values.instructions) {
      this.root.controls.instructions.clear();
      for (const instruction of values.instructions) {
        this.root.controls.instructions.push(
          this.createInstructionGroup(instruction),
        );
      }
    }
    if (values.calories) {
      this.root.controls.calories.setValue(values.calories);
    }
    if (values.protein) {
      this.root.controls.protein.setValue(values.protein);
    }
    if (values.carbohydrates) {
      this.root.controls.carbohydrates.setValue(values.carbohydrates);
    }
    if (values.fat) {
      this.root.controls.fat.setValue(values.fat);
    }
    if (values.fiber) {
      this.root.controls.fiber.setValue(values.fiber);
    }
    if (values.sugar) {
      this.root.controls.sugar.setValue(values.sugar);
    }
    if (values.notes) {
      this.root.controls.notes.setValue(values.notes);
    }
    if (values.shared) {
      this.root.controls.shared.setValue(values.shared);
    }
  }

  updateFromRecipe(recipe: Recipe) {
    this.update({
      name: recipe.name,
      servings: recipe.servings,
      description: recipe.description,
      cookMinutes: recipe.cookMinutes,
      difficulty: recipe.difficulty,
      image: undefined,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      calories: recipe.calories,
      protein: recipe.proteinGrams,
      carbohydrates: recipe.carbohydratesGrams,
      fat: recipe.fatGrams,
      fiber: recipe.fiberGrams,
      sugar: recipe.sugarGrams,
      notes: recipe.notes,
      shared: recipe.shared ? 'yes' : 'no',
    });
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

  private createRoot(values?: {
    name?: string;
    servings?: number;
    description?: string;
    cookMinutes?: number;
    difficulty?: number;
    image?: File;
    ingredients?: {
      name?: string;
      amount?: number;
      unit?: string;
      notes?: string;
    }[];
    instructions?: {
      description?: string;
      minutes?: number;
    }[];
    calories?: number;
    protein?: number;
    carbohydrates?: number;
    fat?: number;
    fiber?: number;
    sugar?: number;
    notes?: string;
    shared?: string;
  }) {
    return this.formBuilder.group({
      name: [values?.name ?? '', [Validators.maxLength(128)]],
      servings: [values?.servings ?? NaN, [Validators.max(99)]],
      description: [values?.description ?? '', [Validators.maxLength(1024)]],
      cookMinutes: [
        values?.cookMinutes ?? NaN,
        [Validators.min(0), Validators.max(9999)],
      ],
      difficulty: [
        values?.difficulty ?? NaN,
        [Validators.min(0), Validators.max(5)],
      ],
      image: this.formBuilder.control<File | undefined>(values?.image, []),
      ingredients: this.formBuilder.array<
        ReturnType<typeof this.createIngredientGroup>
      >(
        (() => {
          const result: ReturnType<typeof this.createIngredientGroup>[] = [];
          for (const ingredient of values?.ingredients ?? []) {
            result.push(
              this.createIngredientGroup({
                name: ingredient.name ?? '',
                amount: ingredient.amount ?? NaN,
                unit: ingredient.unit ?? '',
                notes: ingredient.notes ?? '',
              }),
            );
          }
          return result;
        })(),
      ),
      instructions: this.formBuilder.array<
        ReturnType<typeof this.createInstructionGroup>
      >(
        (() => {
          const result: ReturnType<typeof this.createInstructionGroup>[] = [];
          for (const instruction of values?.instructions ?? []) {
            result.push(
              this.createInstructionGroup({
                description: instruction.description ?? '',
                minutes: instruction.minutes ?? NaN,
              }),
            );
          }
          return result;
        })(),
      ),
      calories: [
        values?.calories ?? NaN,
        [Validators.min(0), Validators.max(9999)],
      ],
      protein: [
        values?.protein ?? NaN,
        [Validators.min(0), Validators.max(9999)],
      ],
      carbohydrates: [
        values?.carbohydrates ?? NaN,
        [Validators.min(0), Validators.max(9999)],
      ],
      fat: [values?.fat ?? NaN, [Validators.min(0), Validators.max(9999)]],
      fiber: [values?.fiber ?? NaN, [Validators.min(0), Validators.max(9999)]],
      sugar: [values?.sugar ?? NaN, [Validators.min(0), Validators.max(9999)]],
      notes: [values?.notes ?? '', [Validators.maxLength(4096)]],
      shared: [values?.shared ?? 'no'],
    });
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
