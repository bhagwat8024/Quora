import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from 'src/assets/global';

const CATEGORYAPI = URL + 'category/';
const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');
@Injectable({
  providedIn: 'root',
})
export class CategoryApiService {
  constructor(private http: HttpClient) {}

  getAllCategories(): any {
    return this.http.get(CATEGORYAPI + 'getAll', { headers: headers });
  }

  getQuestionsByCategory(id: number): any {
    return this.http.get(CATEGORYAPI + `getQuestionByCategory/${id}`, {
      headers: headers,
    });
  }
}
