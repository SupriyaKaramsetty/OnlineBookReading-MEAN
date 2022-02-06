import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit ,AfterViewInit,OnDestroy{

  username: any = '';
  isLogged: boolean = false;
  isAdmin : boolean = false;
  isUserLoggedSubcription !: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.isUserLoggedSubcription = this.authService.loggedSubject.subscribe((data) => {
      this.isLogged = data;
    })
   }
  ngAfterViewInit(): void {
   
  }

  ngOnInit(): void {
    this.isLogged = this.authService.isLoggedIn();
    this.isAdmin = this.authService.isAdmin();
  }

  ngOnDestroy(): void {
      this.isUserLoggedSubcription.unsubscribe();
  }

  isUserLogged(): boolean {
    return this.isLogged;
  }

  isUserAdmin(): boolean {
    if (!this.isAdmin) {
      this.isAdmin = this.authService.isAdmin();
    }
    return this.isAdmin;
  }

  getUsername(): void {
    if (!this.username) {
      this.username = this.authService.username;
    }
  }

  onLogout(): void {
    this.username = undefined;
    this.authService.clearSession();

    this.isLogged = false;
  }

}
