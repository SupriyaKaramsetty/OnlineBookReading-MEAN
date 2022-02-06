
import { Injectable } from '@angular/core';
import {CanActivate,CanLoad,ActivatedRouteSnapshot,RouterStateSnapshot,Route,Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanLoad, CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.isAdmin();
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.isAdmin();
  }

  private isAdmin(): boolean {
    if (this.authService.isAdmin()) {
      return true;
    }

    this.router.navigate(['/user/login']);
    return false;
  }
}
