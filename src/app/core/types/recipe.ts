import { Ingredient } from './ingredient';
import { Instruction } from './instruction';
import { User } from './user';

export interface Recipe {
  id: string;
  author: User;
  name: string;
  servings: number;
  description: string;
  prepMinutes: number;
  cookMinutes: number;
  difficulty: number;
  imageUrl: string;
  tags: string[];
  ingredients: Ingredient[];
  instructions: Instruction[];
  calories: number;
  proteinGrams: number;
  carbohydratesGrams: number;
  fatGrams: number;
  fiberGrams: number;
  sugarGrams: number;
  notes: string;
  shared: boolean;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}
