import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowseComponent } from './components/landing/browse/browse.component';
import { HomeComponent } from './components/landing/home/home.component';

const routes: Routes = [
  {
    path: 'user',
    loadChildren:()=>import('./components/user/user.module').then(mod=>mod.UserModule)
  },
  {
    path:"book",
    loadChildren:()=>import('./components/admin/book/book.module').then(m=>m.BookModule)
  },
  {
    path:"genre",
    loadChildren:()=>import('./components/admin/genre/genre.module').then(m=>m.GenreModule)
  },
  {path: 'home', component: HomeComponent},
  {path: 'browse', component: BrowseComponent},
  {path: 'browse/:query', component: BrowseComponent},
  {path:'', redirectTo:'home', pathMatch: 'full'},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
