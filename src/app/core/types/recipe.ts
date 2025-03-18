import { User } from './user';

export interface Recipe {
  id: string;
  author: User;
  name: string;
  description: string;
  imageUrl: string;
}
