import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../../../../core/services/book.service';
import Swal from 'sweetalert2';
import { Book } from 'src/app/core/models/book.model';
import { GenreService } from 'src/app/core/services/genre.service';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent implements OnInit {

  createBookForm !: FormGroup;
  bookIdError :string = 'Book Id is required';
  bookTitlError : string = "Book Title is required";
  bookAuthorError : string = "Book Author Name is required"
  bookCoverError:string = '';
  genreList !:any;
  constructor(
    private router: Router,
    private bookService: BookService,
    private genreService: GenreService
  ) {

  this.genreService.getGenreList().subscribe((res) => {
    this.genreList = res;
    });
    
   }

  bookCoverErrorMethod() {
    return this.createBookForm.controls['cover'].hasError('required') ? 'Book Cover is required' :
    this.createBookForm.controls['cover'].hasError('isUrl') ? 'Book Cover is Invalid' : '';
  
  }

  ngOnInit(): void {
    
    this.createBookForm = new FormGroup({
      'title': new FormControl('', [
        Validators.required
      ]),
      'author': new FormControl('', [
        Validators.required
      ]),
      'genre': new FormControl('', [
        Validators.required
      ]),
      'release_year': new FormControl('', [
        Validators.required
      ]),
      'description': new FormControl('', [
        Validators.required,
        Validators.minLength(20)
      ]),
      'cover': new FormControl('', [
        Validators.required
      ]),
      'pdf': new FormControl('',[
        Validators.required
      ]),
      'pageCount': new FormControl('', [
        Validators.required,
        Validators.min(0)
      ]),
    });
  }
  get createBookFormControl(){
    return this.createBookForm.controls;
  }

  onSubmit(): void {
    const newBook = {...this.createBookForm.value,genre:this.createBookForm.value.genre.genre_name}
    this.bookService.createSingleBook(newBook).subscribe((res)=> {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Book Added Successfully',
        showConfirmButton: false,
        timer: 1000
      }).then((result)=>{
        this.router.navigate(['/home']);
      });
    });
    
        
      };
  
    

  

}
