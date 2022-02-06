import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/core/guards/admin.guard';
import { CreateGenreComponent } from './create-genre/create-genre.component';
import { DeleteGenreComponent } from './delete-genre/delete-genre.component';

const routes: Routes = [
  {
    path: 'create',
    canActivate: [AdminGuard],
    component: CreateGenreComponent
  },
  {
    path: 'delete',
    canActivate: [AdminGuard],
    component: DeleteGenreComponent
  }, 
  {
    path: '',
    redirectTo: 'booklist',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenreRoutingModule { }
