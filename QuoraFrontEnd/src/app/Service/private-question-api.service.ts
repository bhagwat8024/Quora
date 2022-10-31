import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from 'src/assets/global';
import { Question } from '../Model/Question';

const QUESTIONAPI = URL + 'privateQuestion/';
const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');

@Injectable({
  providedIn: 'root',
})
export class PrivateQuestionApiService {
  constructor(private http: HttpClient) {}
  postQuestion(question: Question) {
    return this.http.post(QUESTIONAPI + 'add', question, { headers: headers });
  }
}
