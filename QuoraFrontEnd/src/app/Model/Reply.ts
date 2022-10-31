import { Question } from './Question';
import { User } from './User';

export class Reply {
  id: number;
  title: string;
  description: string;
  date: string;
  user: User;
  question: Question;
}
