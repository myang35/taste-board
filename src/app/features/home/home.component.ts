import { Component, inject, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { RecipeService } from '@core/services/recipe/recipe.service';
import { Recipe } from '@core/types/recipe';
import { RecipeCardComponent } from './_ui/recipe-card/recipe-card.component';

@Component({
  selector: 'app-home',
  imports: [MatIcon, RecipeCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly recipeService = inject(RecipeService);

  protected heroRecipes?: Recipe[];
  protected trendingRecipes?: Recipe[];

  ngOnInit(): void {
    this.recipeService.getRandom(2).subscribe({
      next: (value) => {
        this.heroRecipes = value;
      },
    });
    this.recipeService
      .getAll({
        sort: 'trending',
        shared: true,
        limit: 3,
      })
      .subscribe({
        next: (value) => {
          this.trendingRecipes = value;
        },
      });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
