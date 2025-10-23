import { inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RecipeService } from '@core/services/recipe/recipe.service';
import { Recipe } from '@core/types/recipe';
import { ApiErrorUtils } from '@core/utils/api-error-utils/api-error-utils';
import { tap } from 'rxjs';

export class CreateForm {
  private readonly formBuilder = inject(FormBuilder);
  private readonly recipeService = inject(RecipeService);

  root: ReturnType<typeof this.createRoot>;
  errorMessage = signal('');
  fieldErrorMessages = signal<Record<string, string>>({});

  readonly validators = {
    name: {
      MAX_LENGTH: 128,
    },
    servings: {
      MAX: 9999,
    },
    description: {
      MAX_LENGTH: 1024,
    },
    ingredients: {
      name: {
        MAX_LENGTH: 128,
      },
      amount: {
        MAX: 9999,
      },
      unit: {
        MAX_LENGTH: 32,
      },
      notes: {
        MAX_LENGTH: 32,
      },
    },
    instructions: {
      description: {
        MAX_LENGTH: 1024,
      },
      minutes: {
        MAX: 999999,
      },
    },
    calories: {
      MIN: 0,
      MAX: 999999,
    },
    protein: {
      MIN: 0,
      MAX: 999999,
    },
    carbohydrates: {
      MIN: 0,
      MAX: 999999,
    },
    fat: {
      MIN: 0,
      MAX: 999999,
    },
    fiber: {
      MIN: 0,
      MAX: 999999,
    },
    sugar: {
      MIN: 0,
      MAX: 999999,
    },
    notes: {
      MAX_LENGTH: 4096,
    },
  };

  constructor(values?: {
    name?: string;
    servings?: number;
    description?: string;
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
    shared?: boolean;
  }) {
    this.root = this.createRoot(values);
  }

  static fromRecipe(recipe: Recipe) {
    return new CreateForm({
      name: recipe.name,
      servings: recipe.servings,
      description: recipe.description,
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
      shared: recipe.shared,
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
      image: this.image.value,
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
      shared: !!this.shared.value,
    };
  }

  hasError(field: string) {
    const fieldData = field.split('.');
    switch (fieldData[0]) {
      case 'name':
        return (
          (this.name.invalid && this.name.touched) ||
          !!this.fieldErrorMessages()[field]
        );
      case 'servings':
        return (
          (this.servings.invalid && this.servings.touched) ||
          !!this.fieldErrorMessages()[field]
        );
      case 'description':
        return (
          (this.description.invalid && this.description.touched) ||
          !!this.fieldErrorMessages()[field]
        );
      case 'ingredients': {
        const index = Number.parseInt(fieldData[1]);
        if (Number.isNaN(index)) {
          throw new Error('Invalid field');
        }
        if (!['name', 'amount', 'unit', 'notes'].includes(fieldData[2])) {
          throw new Error('Invalid field');
        }
        const ingredientControl = this.ingredients.controls[index];
        const fieldControlKey =
          fieldData[2] as keyof typeof ingredientControl.controls;
        const fieldControl = ingredientControl.controls[fieldControlKey];
        return (
          (fieldControl.invalid && fieldControl.touched) ||
          !!this.fieldErrorMessages()[field]
        );
      }
      case 'instructions': {
        const index = Number.parseInt(fieldData[1]);
        if (Number.isNaN(index)) {
          throw new Error('Invalid field');
        }
        if (!['description', 'minutes'].includes(fieldData[2])) {
          throw new Error('Invalid field');
        }
        const instructionControl = this.instructions.controls[index];
        const fieldControlKey =
          fieldData[2] as keyof typeof instructionControl.controls;
        const fieldControl = instructionControl.controls[fieldControlKey];
        return (
          (fieldControl.invalid && fieldControl.touched) ||
          !!this.fieldErrorMessages()[field]
        );
      }
      case 'calories':
        return (
          (this.calories.invalid && this.calories.touched) ||
          !!this.fieldErrorMessages()[field]
        );
      case 'protein':
        return (
          (this.protein.invalid && this.protein.touched) ||
          !!this.fieldErrorMessages()['proteinGrams']
        );
      case 'carbohydrates':
        return (
          (this.carbohydrates.invalid && this.carbohydrates.touched) ||
          !!this.fieldErrorMessages()['carbohydratesGrams']
        );
      case 'fat':
        return (
          (this.fat.invalid && this.fat.touched) ||
          !!this.fieldErrorMessages()['fatGrams']
        );
      case 'fiber':
        return (
          (this.fiber.invalid && this.fiber.touched) ||
          !!this.fieldErrorMessages()['fiberGrams']
        );
      case 'sugar':
        return (
          (this.sugar.invalid && this.sugar.touched) ||
          !!this.fieldErrorMessages()['sugarGrams']
        );
      case 'notes':
        return (
          (this.notes.invalid && this.notes.touched) ||
          !!this.fieldErrorMessages()[field]
        );
      default:
        return false;
    }
  }

  update(values: {
    name?: string;
    servings?: number;
    description?: string;
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
    shared?: boolean;
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
      shared: recipe.shared,
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

  submitCreate() {
    return this.recipeService.create(this.values).pipe(
      tap({
        error: (error) => this.handleError(error),
      }),
    );
  }

  submitUpdate(recipeId: string) {
    return this.recipeService.update(recipeId, this.values).pipe(
      tap({
        error: (error) => this.handleError(error),
      }),
    );
  }

  private createRoot(values?: {
    name?: string;
    servings?: number;
    description?: string;
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
    shared?: boolean;
  }) {
    return this.formBuilder.group({
      name: [
        values?.name ?? '',
        [
          Validators.required,
          Validators.maxLength(this.validators.name.MAX_LENGTH),
        ],
      ],
      servings: [
        values?.servings ?? NaN,
        [Validators.max(this.validators.servings.MAX)],
      ],
      description: [
        values?.description ?? '',
        [Validators.maxLength(this.validators.description.MAX_LENGTH)],
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
        [
          Validators.min(this.validators.calories.MIN),
          Validators.max(this.validators.calories.MAX),
        ],
      ],
      protein: [
        values?.protein ?? NaN,
        [
          Validators.min(this.validators.protein.MIN),
          Validators.max(this.validators.protein.MAX),
        ],
      ],
      carbohydrates: [
        values?.carbohydrates ?? NaN,
        [
          Validators.min(this.validators.carbohydrates.MIN),
          Validators.max(this.validators.carbohydrates.MAX),
        ],
      ],
      fat: [
        values?.fat ?? NaN,
        [
          Validators.min(this.validators.fat.MIN),
          Validators.max(this.validators.fat.MAX),
        ],
      ],
      fiber: [
        values?.fiber ?? NaN,
        [
          Validators.min(this.validators.fiber.MIN),
          Validators.max(this.validators.fiber.MAX),
        ],
      ],
      sugar: [
        values?.sugar ?? NaN,
        [
          Validators.min(this.validators.sugar.MIN),
          Validators.max(this.validators.sugar.MAX),
        ],
      ],
      notes: [
        values?.notes ?? '',
        [Validators.maxLength(this.validators.notes.MAX_LENGTH)],
      ],
      shared: [!!values?.shared],
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
        [
          Validators.required,
          Validators.maxLength(this.validators.ingredients.name.MAX_LENGTH),
        ],
      ],
      amount: [
        value?.amount ?? NaN,
        [
          Validators.required,
          Validators.max(this.validators.ingredients.amount.MAX),
        ],
      ],
      unit: [
        value?.unit ?? '',
        [
          Validators.required,
          Validators.maxLength(this.validators.ingredients.unit.MAX_LENGTH),
        ],
      ],
      notes: [
        value?.notes ?? '',
        [Validators.maxLength(this.validators.ingredients.notes.MAX_LENGTH)],
      ],
    });
  }

  private createInstructionGroup(value?: {
    description?: string;
    minutes?: number;
  }) {
    return this.formBuilder.group({
      description: [
        value?.description ?? '',
        [
          Validators.maxLength(
            this.validators.instructions.description.MAX_LENGTH,
          ),
        ],
      ],
      minutes: [
        value?.minutes ?? NaN,
        [Validators.max(this.validators.instructions.minutes.MAX)],
      ],
    });
  }

  private handleError(error: unknown) {
    ApiErrorUtils.handleError(error, {
      invalidInputsError: (error) => {
        this.errorMessage.set(error.message);
        this.fieldErrorMessages.set(error.data.inputs);
      },
      apiError: (error) => {
        this.errorMessage.set(error.message);
      },
      httpErrorResponse: (error) => {
        this.errorMessage.set(error.message);
      },
      unknownError: () => this.errorMessage.set('An unknown error occurred'),
    });
  }
}
