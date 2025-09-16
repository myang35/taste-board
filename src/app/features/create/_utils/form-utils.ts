import { inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

export class FormUtils {
  private static formBuilder = inject(FormBuilder);

  static createIngredientGroup() {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(128)]],
      amount: [0, [Validators.max(9999)]],
      unit: ['', [Validators.maxLength(32)]],
      notes: ['', []],
    });
  }

  static createStepControl() {
    return this.formBuilder.control('', [Validators.maxLength(1024)]);
  }

  static createTagControl() {
    return this.formBuilder.control('', [Validators.maxLength(32)]);
  }
}
