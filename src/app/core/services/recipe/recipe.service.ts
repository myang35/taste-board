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
    shared?: boolean;
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

    if (params?.shared) {
      url.searchParams.append('shared', params.shared ? 'true' : 'false');
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
    servings: number;
    description: string;
    image?: File | null;
    ingredients: {
      name: string;
      amount: number;
      unit: string;
      notes: string;
    }[];
    instructions: {
      description: string;
      minutes: number;
    }[];
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
    fiber: number;
    sugar: number;
    notes: string;
    shared: boolean;
  }) {
    const user = this.authService.user();
    if (!user) {
      throw new Error('User must be logged in to create a recipe');
    }

    const formData = new FormData();
    if (params.image) {
      formData.set('image', params.image, params.image.name);
    }
    formData.set(
      'data',
      JSON.stringify({
        name: params.name,
        servings: params.servings,
        description: params.description,
        ingredients: params.ingredients,
        instructions: params.instructions,
        calories: params.calories,
        proteinGrams: params.protein,
        carbohydratesGrams: params.carbohydrates,
        fatGrams: params.fat,
        fiberGrams: params.fiber,
        sugarGrams: params.sugar,
        notes: params.notes,
        shared: params.shared,
      }),
    );

    return this.http.post<Recipe>(`${environment.apiUrl}/recipes`, formData);
  }

  update(
    id: string,
    params: {
      name?: string;
      servings?: number;
      description?: string;
      cookMinutes?: number;
      image?: File | null;
      ingredients?: {
        name: string;
        amount: number;
        unit: string;
        notes: string;
      }[];
      instructions?: {
        description: string;
        minutes: number;
      }[];
      calories?: number;
      protein?: number;
      carbohydrates?: number;
      fat?: number;
      fiber?: number;
      sugar?: number;
      notes?: string;
      shared?: boolean;
    },
  ) {
    const user = this.authService.user();
    if (!user) {
      throw new Error('User must be logged in to update a recipe');
    }

    const formData = new FormData();
    if (params.image) {
      formData.set('image', params.image);
    }
    formData.set(
      'data',
      JSON.stringify({
        name: params.name,
        servings: params.servings,
        description: params.description,
        cookMinutes: params.cookMinutes,
        image: params.image,
        ingredients: params.ingredients,
        instructions: params.instructions,
        calories: params.calories,
        proteinGrams: params.protein,
        carbohydratesGrams: params.carbohydrates,
        fatGrams: params.fat,
        fiberGrams: params.fiber,
        sugarGrams: params.sugar,
        notes: params.notes,
        shared: params.shared,
      }),
    );

    return this.http.patch<Recipe>(
      `${environment.apiUrl}/recipes/${id}`,
      formData,
    );
  }

  delete(id: string) {
    const user = this.authService.user();
    if (!user) {
      throw new Error('User must be logged in to delete a recipe');
    }

    return this.http.delete<Recipe>(`${environment.apiUrl}/recipes/${id}`);
  }

  addView(id: string, viewerId?: string) {
    return this.http.post(`${environment.apiUrl}/recipes/${id}/views`, {
      viewerId,
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
