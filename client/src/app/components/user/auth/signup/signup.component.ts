import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {  PasswordMatch } from '../../form-validators/passwordMatch.validator';
// import {MatSnackBar} from '@angular/material/snack-bar';
import Swal from 'sweetalert2'
import { UserService } from 'src/app/core/services/user.service';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  errorMsg = '';
  signupForm !: FormGroup;
  submitted: boolean = false;
  regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
    constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
      ]],
      confirmpassword: ['', [
        Validators.required,
        Validators.minLength(8),
      ]]
    },{
      validator: PasswordMatch('password', 'confirmpassword')
    });


  }

  get signupFormControl() {
    return this.signupForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if(this.signupForm.invalid){
      return;
    }
    this.userService.signup(this.signupForm.value).subscribe(
{
  next: (res) => { 
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Signup Successful',
        showConfirmButton: false,
        timer: 1000
      }).then( result => {
        this.router.navigate(['/user/login']);
        });
  },
  error: (error) => (this.errorMsg = error.error.text)
  });
  

}
}
