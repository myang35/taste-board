import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-tag-selector',
  imports: [MatIcon, ReactiveFormsModule],
  templateUrl: './tag-selector.component.html',
  styleUrl: './tag-selector.component.css',
})
export class TagSelectorComponent {
  private formBuilder = inject(FormBuilder);

  inputControl = this.formBuilder.control('', [
    Validators.minLength(1),
    Validators.maxLength(64),
  ]);
  selectedTags: string[] = [];
  popularTags: string[] = [
    'Vegetarian',
    'Vegan',
    'Gluten-Free',
    'Dairy-Free',
    'Keto',
    'Low-Carb',
    'Healthy',
    'Quick',
    'Comfort Food',
    'Dessert',
  ];

  onFormSubmit() {
    const tag = this.inputControl.value;
    if (!tag) return;

    this.selectedTags.push(tag);
  }
}
