import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RecipeService } from '@core/services/recipe/recipe.service';
import { Recipe } from '@core/types/recipe';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-browse',
  imports: [AsyncPipe, MatIconModule],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css',
})
export class BrowseComponent implements OnInit {
  private recipeService = inject(RecipeService);

  recipes$?: Observable<Recipe[]>;

  ngOnInit(): void {
    this.recipes$ = this.recipeService.getAll();
  }
}
