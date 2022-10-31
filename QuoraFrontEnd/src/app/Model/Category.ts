import { Question } from './Question';

export class Category {
  id: number;
  name: string;
  description: string;
  questions: Question[];
}
