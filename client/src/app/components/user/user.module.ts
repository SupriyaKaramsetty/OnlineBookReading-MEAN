import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyCommonModule } from '../layout/common.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MyLibraryComponent } from './my-library/my-library.component';
import { SharedModule } from '../shared/shared.module';
import { CreateBookComponent } from '../admin/book/create-book/create-book.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    MyLibraryComponent
  ],
  imports: [
    CommonModule,
    MyCommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    SharedModule,
    MatButtonModule,
  ]
})
export class UserModule { }
