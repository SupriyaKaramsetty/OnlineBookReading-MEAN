import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMsg = '';
  toggle: boolean = false;
  loginForm !: FormGroup;
  submitted: boolean = false;

  loggedInUser !: any;
  constructor(private router: Router,
    private authService: AuthService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [
        Validators.required,Validators.email
      ]),
      'password': new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
    });
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }

  onSubmit(){
    this.submitted = true;
    if(this.loginForm.invalid){
      return;
    }   
    else{
      this.userService.login(this.loginForm.value).subscribe(({
        next: (res) => {
        this.authService.setToken(res.token);
        this.authService.loggedSubject.next(true);
          Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Login Successful',
        showConfirmButton: false,
        timer: 1000
      }).then( result => {
      this.router.navigate(['/home']);
     })
    },
    error: (error) => (this.errorMsg = error.error.text)}));
    }
    }
  }

