import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from 'src/assets/global';
import { Reply } from '../Model/Reply';

const REPLYAPI = URL + 'privateReply/';
const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');
@Injectable({
  providedIn: 'root',
})
export class PrivateReplyApiService {
  constructor(private http: HttpClient) {}

  postReply(reply: Reply): any {
    return this.http.post(REPLYAPI, reply, { headers: headers });
  }
}
