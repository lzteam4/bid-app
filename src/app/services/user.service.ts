import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiConfig } from '../helpers/config/api-config';
import { Observable } from 'rxjs';
import { IUser } from '../entities';
//import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {//extends DataService {
  user: IUser;

   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };


  constructor(private http: HttpClient) {
    // super(ApiConfig.baseUrl + ApiConfig.user, http);
  }
  register(user: IUser) {
    return this.http.post(ApiConfig.baseUrl + ApiConfig.user,user);
}

  getUser(userId: string): Observable<IUser> {
    return this.http.get<IUser>(ApiConfig.baseUrl + ApiConfig.user + "/" + userId).pipe();
  }

  getUserByUP(userName: string, password: string): Observable<IUser> {
    return this.http.get<IUser>(ApiConfig.baseUrl + ApiConfig.user + "/username/" + userName + "/password/" + password).pipe();
  }

  updateToken(token: string) {
    console.log(this.user);
    this.user.FcmToken = token;
    return this.http.put<string>(ApiConfig.baseUrl + ApiConfig.user + "/" + this.user.Id, this.user, this.httpOptions).pipe();
  }

  setCurrentUser(user) {
    this.user = user;
  }
  
  getAll() {
    return this.http.get<IUser[]>(`${ApiConfig.baseUrl + ApiConfig.user}/users`);
}

  getCurrentUser() {
    return this.user;
  }

  delete(id: number) {
    return this.http.delete(`${ApiConfig.baseUrl + ApiConfig.user}/users/${id}`);
}

}
