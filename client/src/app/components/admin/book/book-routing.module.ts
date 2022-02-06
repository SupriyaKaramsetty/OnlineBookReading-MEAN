import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/core/guards/admin.guard';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { CreateBookComponent } from './create-book/create-book.component';
import { UpdateBookComponent } from './update-book/update-book.component';

const routes: Routes = [
  {
    path: 'create',
    canActivate: [AdminGuard],
    component: CreateBookComponent
  },
  {
    path: 'update/:bookId',
    canActivate: [AdminGuard],
    component: UpdateBookComponent
  },
  {
    path: 'detail/:bookId',
    component: BookDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
