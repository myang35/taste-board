import { Component, inject, viewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
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

  tabGroup = viewChild.required<TabGroupComponent>('tabGroup');
  form = this.formBuilder.group({
    info: this.formBuilder.group({
      name: ['', [Validators.maxLength(128)]],
      description: ['', [Validators.maxLength(1024)]],
      prepMinutes: ['', [Validators.min(0), Validators.max(999)]],
    }),
    ingredients: this.formBuilder.array([this.createIngredientGroup()]),
    steps: this.formBuilder.array([this.createStepFormControl()]),
    notes: ['', [Validators.maxLength(4096)]],
  });

  get ingredients() {
    return this.form.get('ingredients') as FormArray<
      ReturnType<typeof this.createIngredientGroup>
    >;
  }

  get steps() {
    return this.form.get('steps') as FormArray;
  }

  addIngredient() {
    this.ingredients.push(this.createIngredientGroup());
  }

  deleteIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  addStep() {
    this.steps.push(this.createStepFormControl());
  }

  deleteStep(index: number) {
    this.steps.removeAt(index);
  }

  private createIngredientGroup() {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(128)]],
      amount: [0, [Validators.max(9999)]],
      unit: ['', [Validators.maxLength(32)]],
    });
  }

  private createStepFormControl() {
    return this.formBuilder.control('', [Validators.maxLength(1024)]);
  }
}
