import { Category } from './Category';
import { Reply } from './Reply';
import { User } from './User';

export class Question {
  id: number;
  title: string;
  description: string;
  isAns: number;
  likes: number;
  totalReplies: number;
  date: string;
  category: Category;
  user: User;
  replies: Reply[];
  likeBy: User[];
}
