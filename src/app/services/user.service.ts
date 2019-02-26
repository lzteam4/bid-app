import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiConfig } from '../helpers/config/api-config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from '../entities';
import { AuthenticationService } from './authentication.service';
//import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {//extends DataService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'text/plain',
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
    // super(ApiConfig.baseUrl + ApiConfig.user, http);
  }
  create(user: IUser) {
    return this.http.post<IUser>(ApiConfig.baseUrl + ApiConfig.user, user);
  }

  get(userId: string): Observable<IUser> {
    return this.http.get<IUser>(ApiConfig.baseUrl + ApiConfig.user + "/" + userId).pipe();
  }

  update(user: IUser) {
    console.log(user);
    return this.http.put<IUser>(ApiConfig.baseUrl + ApiConfig.user + "/" + user.Id, user).pipe();
  }

  updateTokenForCurrentUser(token: string) {
    let user = this.authenticationService.currentUserValue;
    if (user) {
      user.FcmToken = token;
      return this.http.put<IUser>(ApiConfig.baseUrl + ApiConfig.user + "/" + user.Id, user).pipe(
        map(user => {
          this.authenticationService.currentUserValue = user;
          return user;
        })
      );
    }
  }

  getAll() {
    return this.http.get<IUser[]>(`${ApiConfig.baseUrl + ApiConfig.user}/users`);
  }

  delete(id: number) {
    return this.http.delete(`${ApiConfig.baseUrl + ApiConfig.user}/users/${id}`);
  }

}
