import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs';
import { URL } from 'src/assets/global';
import { User } from '../Model/User';
import { UserApiService } from './user-api.service';

const USERAPI = URL + 'loginUser/';

const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');
@Injectable({
  providedIn: 'root',
})
export class LoginUserApiService {
  constructor(private http: HttpClient, private userService: UserApiService) {}

  getAllLikedQuestion(): any {
    let id = this.userService.getUser().id;
    let listOfIds = [];

    return this.http.get(USERAPI + `allLikeQuestions/${id}`, {
      headers: headers,
    });
  }

  likeQuestion(qid: number): any {
    let id = this.userService.getUser().id;
    let url = USERAPI + `like/${id}/${qid}`;
    return this.http
      .put(url, {
        headers: headers,
      })
      .subscribe();
  }
  unlikeQuestion(qid: number): any {
    let id = this.userService.getUser().id;
    let url = USERAPI + `unlike/${id}/${qid}`;
    console.log(url);
    return this.http
      .put(url, {
        headers: headers,
      })
      .subscribe();
  }

  followUser(followerId: number, followingId: number) {
    return this.http.put(USERAPI + `follow/${followerId}/${followingId}`, {
      headers: headers,
    });
  }
  unfollowUser(followerId: number, followingId: number) {
    return this.http.put(USERAPI + `unfollow/${followerId}/${followingId}`, {
      headers: headers,
    });
  }

  updateData(firstName: any, lastName: any, about: any, id: number) {
    this.http
      .put(USERAPI + `updateFirstName/${id}/${firstName}`, {
        headers: headers,
      })
      .subscribe();
    this.http
      .put(USERAPI + `updateLastName/${id}/${lastName}`, {
        headers: headers,
      })
      .subscribe();
    this.http
      .put(USERAPI + `updateAbout/${id}/${about}`, {
        headers: headers,
      })
      .subscribe();
  }
}
