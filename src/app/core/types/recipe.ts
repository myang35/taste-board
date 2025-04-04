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
  ingredients: {
    id: string;
    name: string;
    amount: number;
    unit: string;
  }[];
  steps: string[];
  notes: string;
  shared: boolean;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}
