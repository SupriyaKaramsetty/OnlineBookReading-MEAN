// Decorators
import { Injectable } from '@angular/core';

// RXJS
import { Observable, Subject } from 'rxjs';

// HTTP
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';

// Model

const domain = 'http://localhost:5000/user';
const signupEndPoint = domain + '/signup';
const loginEndpoint = domain + '/login';
const allUsersEndPoint = domain + '/list';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token = new Subject<any>();
  constructor(private http: HttpClient) { }

  signup(payload: object): Observable<any> {
    return this.http.post<any>(signupEndPoint, payload);
  }

  login(payload: object):Observable<any> {
    return this.http.post(loginEndpoint, payload);
  }

  getAllUsers() : Observable<any[]>{
    this.token.subscribe((res) => {
      this.token = res;
    })
    return this.http.get<any[]>(allUsersEndPoint,
      {
        headers: {
          authorization: "Bearer " + this.token
        }
      });
  }




}
