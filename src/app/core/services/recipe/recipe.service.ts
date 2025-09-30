import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Recipe } from '@core/types/recipe';
import { environment } from '@env';
import { catchError, map, of } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  getAll(params?: {
    sort?: string;
    search?: string;
    limit?: number;
    skip?: number;
    userId?: string;
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

    if (params?.userId) {
      url.searchParams.append('userId', params.userId);
    }

    return this.http.get<Recipe[]>(url.toString());
  }

  get(id: string) {
    return this.http
      .get<Recipe | null>(`${environment.apiUrl}/recipes/${id}`)
      .pipe(
        catchError((error) => {
          if (error?.error?.error === 'RESOURCE_NOT_FOUND') {
            return of(null);
          }
          throw error;
        }),
      );
  }

  getRandom(size: number) {
    return this.http.get<Recipe[]>(
      `${environment.apiUrl}/recipes/random/${size}`,
    );
  }

  create(params: {
    name: string;
    description: string;
    prepMinutes: number;
    calories: number;
    tags: string[];
    ingredients: {
      name: string;
      amount: number;
      unit: string;
    }[];
    steps: string[];
    notes: string;
    shared: boolean;
  }) {
    const user = this.authService.user();
    if (!user) {
      throw new Error('User must be logged in to create a recipe');
    }

    return this.http.post<Recipe>(`${environment.apiUrl}/recipes`, {
      authorId: user.id,
      name: params.name,
      description: params.description,
      prepMinutes: params.prepMinutes,
      calories: params.calories,
      tags: params.tags,
      ingredients: params.ingredients,
      steps: params.steps,
      notes: params.notes,
      shared: params.shared,
    });
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
