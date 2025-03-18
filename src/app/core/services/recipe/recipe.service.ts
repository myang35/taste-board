import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Recipe } from '@core/types/recipe';
import { environment } from '@env';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private http = inject(HttpClient);

  getAll() {
    return this.http.get<Recipe[]>(`${environment.apiUrl}/recipes`);
  }
}
