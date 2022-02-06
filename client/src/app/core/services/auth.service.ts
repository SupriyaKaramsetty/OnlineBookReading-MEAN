import { Injectable } from '@angular/core';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { UserService } from './user.service';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  username: string ='';
  userToken  = new Subject<any>();
  loggedSubject = new Subject<any>();
  user !: any;

  constructor(private userService: UserService) {

   }

  setToken(token : string){
    localStorage.setItem('token',token);
    this.userService.token.next(token);
  }

    
  

  getToken(): any {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    try {
      const decoded = decode(this.getToken());
      if (decoded) {
        this.loggedSubject.next(true);
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  }


    getUser(): any {
      try {
        const decoded : any = decode(this.getToken());
       return decoded['email'];
      } catch (err) {
        return {};
      }
    }

    isAdmin(): boolean {
      try {
        const decoded : any = decode(this.getToken());
        if(decoded['role'] == "admin"){
          return true;
        }
        return false;
      } catch (err) {
        return false;
      }
    }


    clearSession(){
      localStorage.removeItem('token');
    }

}
