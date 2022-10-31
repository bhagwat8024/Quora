import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from 'src/assets/global';
import { Reply } from '../Model/Reply';

const REPLYAPI = URL + 'reply/';
const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');
@Injectable({
  providedIn: 'root',
})
export class ReplyApiService {
  constructor(private http: HttpClient) {}

  getRepliesByQId(id: number): any {
    return this.http.get(REPLYAPI + `getByQId/${id}`, { headers: headers });
  }
}
