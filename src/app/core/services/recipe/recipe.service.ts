import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Recipe } from '@core/types/recipe';
import { environment } from '@env';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private http = inject(HttpClient);

  getAll(params?: {
    sort?: string;
    search?: string;
    limit?: number;
    skip?: number;
  }) {
    const url = new URL(`${environment.apiUrl}/recipes`);

    if (params?.sort) {
      url.searchParams.append('sort', params.sort);
    }

    if (params?.search) {
      url.searchParams.append('search', params.search);
    }

    if (params?.limit) {
      url.searchParams.append('limit', params.limit.toString());
    }

    if (params?.skip) {
      url.searchParams.append('skip', params.skip.toString());
    }

    return this.http.get<Recipe[]>(url.toString());
  }

  count(params?: { search?: string }) {
    const url = new URL(`${environment.apiUrl}/recipes/count`);

    if (params?.search) {
      url.searchParams.append('search', params.search);
    }

    return this.http
      .get<{ result: number }>(url.toString())
      .pipe(map((value) => value.result));
  }
}
