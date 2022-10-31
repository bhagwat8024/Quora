import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from 'src/assets/global';
import { Question } from '../Model/Question';

const QUESTIONAPI = URL + 'question/';
const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');

@Injectable({
  providedIn: 'root',
})
export class QuestionApiService {
  constructor(private http: HttpClient) {}

  getQuestion(id: number): any {
    return this.http.get(QUESTIONAPI + `getByQId/${id}`, { headers: headers });
  }

  getAllQuestions(): any {
    return this.http.get(QUESTIONAPI + 'getAllQuestions', { headers: headers });
  }

  getLikedUsers(id: number): any {
    return this.http.get(QUESTIONAPI + `getLikedUsers/${id}`, {
      headers: headers,
    });
  }

  getQuestionById(id: number): any {
    return this.http.get(QUESTIONAPI + `getQuestionOfUser/${id}`, {
      headers: headers,
    });
  }

  searchQuestions(title: string): any {
    return this.http.get(QUESTIONAPI + `search/${title}`, {
      headers: headers,
    });
  }
}
