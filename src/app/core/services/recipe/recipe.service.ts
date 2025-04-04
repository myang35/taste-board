import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Recipe } from '@core/types/recipe';
import { environment } from '@env';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private http = inject(HttpClient);

  getAll(params?: { sort?: string }) {
    const url = new URL(`${environment.apiUrl}/recipes`);

    if (params?.sort) {
      url.searchParams.append('sort', params.sort);
    }

    return this.http.get<Recipe[]>(url.toString());
  }
}
