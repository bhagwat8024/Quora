import { Injectable } from '@angular/core';
import { URL } from 'src/assets/global';
import { User } from '../Model/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { SecurityToken } from '../Model/token';

const USERAPI = URL + 'user/';
const LOGINAPI = URL + 'login/';

const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  logoutSubject = new Subject<boolean>();

  constructor(private http: HttpClient) {}
  public temp() {
    console.log('in temp');
  }

  public registerUser(user: User): any {
    return this.http.post(USERAPI, user, { headers: headers });
  }

  public generateToken(user: User): any {
    return this.http.post(LOGINAPI, user, { headers: headers });
  }

  public getCurrentUser(): any {
    return this.http.post(LOGINAPI + 'current-user', { headers: headers });
  }

  public loginUser(token: string): boolean {
    localStorage.setItem('token', token);
    return true;
  }

  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.logoutSubject.next(true);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  setUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    let userStr = localStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logoutUser();
      return null;
    }
  }

  isLoggedIn(): boolean {
    let token = localStorage.getItem('token');
    if (
      token == undefined ||
      token == '' ||
      token == null ||
      token.length == 0
    ) {
      return false;
    }
    return true;
  }

  getUserById(id: number): any {
    return this.http.get(USERAPI + `${id}`, { headers: headers });
  }

  getFollowers(username: string): any {
    return this.http.get(USERAPI + `getFollowers/${username}`, {
      headers: headers,
    });
  }

  getFollowings(username: string): any {
    return this.http.get(USERAPI + `getFollowings/${username}`, {
      headers: headers,
    });
  }
}
