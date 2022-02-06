import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenreRoutingModule } from './genre-routing.module';
import { CreateGenreComponent } from './create-genre/create-genre.component';
// import { UpdateGenreComponent } from './update-genre/update-genre.component';
import { DeleteGenreComponent } from './delete-genre/delete-genre.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    CreateGenreComponent,
    // UpdateGenreComponent,
    DeleteGenreComponent
  ],
  imports: [
    CommonModule,
    GenreRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class GenreModule { }
