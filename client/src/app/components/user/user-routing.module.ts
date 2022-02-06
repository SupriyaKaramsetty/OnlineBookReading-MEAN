import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/core/guards/admin.guard';
import { UserGuard } from 'src/app/core/guards/user.guard';
import { VisitorGuard } from 'src/app/core/guards/visitor.guard';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyLibraryComponent } from './my-library/my-library.component';

const routes: Routes = [
  {path:'signup',
  canActivate: [VisitorGuard],
  component: SignupComponent},
  {path:'login',
  canActivate: [VisitorGuard],
  component: LoginComponent},
  {path: 'dashboard',
  canActivate: [UserGuard],
  component: DashboardComponent},
  // {path: 'list',
  //  canActivate: [AdminGuard],
  //   component: UserListComponent},
   {path: 'my-library',
   canActivate: [UserGuard],
    component: MyLibraryComponent},
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
