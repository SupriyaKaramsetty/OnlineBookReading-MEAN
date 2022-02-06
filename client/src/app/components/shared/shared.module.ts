import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookComponent } from './book/book.component';
import { ReviewComponent } from './review/review.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GenreComponent } from './genre/genre.component';
import {MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';



@NgModule({
  declarations: [
    BookComponent,
    ReviewComponent,
    GenreComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule
    
  ],
  exports: [BookComponent,ReviewComponent, GenreComponent]
})
export class SharedModule { }
