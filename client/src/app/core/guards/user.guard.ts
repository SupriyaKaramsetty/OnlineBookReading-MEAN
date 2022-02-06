
import { Injectable } from '@angular/core';
import {CanActivate,CanLoad,ActivatedRouteSnapshot,RouterStateSnapshot,Route,Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root'
})

export class UserGuard implements CanLoad, CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.isAuthenticated();
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.isAuthenticated();
  }

  private isAuthenticated(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }

    this.router.navigate(['/user/login']);
    return false;
  }
}
