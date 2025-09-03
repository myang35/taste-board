import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientCheckboxComponent } from './ingredient-checkbox.component';

describe('IngredientCheckboxComponent', () => {
  let component: IngredientCheckboxComponent;
  let fixture: ComponentFixture<IngredientCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngredientCheckboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngredientCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
