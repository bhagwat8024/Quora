import { Question } from './Question';
import { Reply } from './Reply';

export class User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  image: string;
  email: string;
  phone: string;
  followersCount: number;
  followingsCount: number;
  joiningDate: string;
  name: string;
  about: string;

  questions: Question[];
  replies: Reply[];
  likeQuestions: Question[];
  followings: User[];
  followers: User[];

  constructor() {
    this.name = this.firstName + this.lastName;
  }
}
