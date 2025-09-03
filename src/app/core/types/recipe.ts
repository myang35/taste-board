import { Ingredient } from './ingredient';
import { User } from './user';

export interface Recipe {
  id: string;
  author: User;
  name: string;
  description: string;
  imageUrl: string;
  prepMinutes: number;
  calories: number;
  tags: string[];
  ingredients: Ingredient[];
  steps: string[];
  notes: string;
  shared: boolean;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}
