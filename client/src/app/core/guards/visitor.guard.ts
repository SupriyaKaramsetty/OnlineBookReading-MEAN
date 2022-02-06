
import { Injectable } from '@angular/core';
import {CanActivate,CanLoad,ActivatedRouteSnapshot,RouterStateSnapshot,Route,Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class VisitorGuard implements CanLoad, CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.isVisitor();
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.isVisitor();
  }

  private isVisitor(): boolean {
    if (!this.authService.isLoggedIn()) {
      return true;
    }

    this.router.navigate(['/home']);
    return false;
  }
}
