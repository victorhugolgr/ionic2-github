import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

/*
  Generated class for the GithubUsers provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GithubUsers {

  githubApiUrl = 'https://api.github.com';

  constructor(public http: Http) { }

  /**
   * Lista todos os usuários
   */
  load(): Observable<User[]> {
    return this.http.get(`${this.githubApiUrl}/users`)
      .map(res => <User[]>res.json());
  }

  loadDetails(login: string): Observable<User> {
    return this.http.get(`${this.githubApiUrl}/users/${login}`)
      .map(res => <User>(res.json()));
  }

  serarchUsers(searchParam:string):Observable<User[]>{
    return this.http.get(`${this.githubApiUrl}/search/users?q=${searchParam}`)
      .map(res=><User[]>(res.json().items));
  }
}
