import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/core/models/book.model';
import { GenreService } from 'src/app/core/services/genre.service';
import Swal from 'sweetalert2';
import { BookService } from '../../../../core/services/book.service';
@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit {

  bookTitlError : string = "Book Title is required";
  bookAuthorError : string = "Book Author Name is required"
  bookCoverError:string = '';
  updateBookForm !: FormGroup;
  oldData !: Book;
  genreList !: any;
 

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService,
    private genreService: GenreService
  ) { 
    this.genreService.getGenreList().subscribe((res) => {
      this.genreList = res;
      });
  const id = this.route.snapshot.params['bookId'];
 
}
  ngOnInit(): void {
    const id = this.route.snapshot.params['bookId'];
    this.bookService.getSingleBook(id).subscribe((singlebook)=>{
      console.log(singlebook);
      this.updateBookForm.patchValue({
        ...singlebook
      })
    });
    this.updateBookForm = new FormGroup({
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
        Validators.minLength(10)
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

  get updateBookFormControl(){
    return this.updateBookForm.controls;
  }
 

  onSubmit(): void {
    const updatedBook = {...this.updateBookForm.value,genre:this.updateBookForm.value.genre.genre_name}
    this.bookService.updateSingleBook(this.route.snapshot.params['bookId'],updatedBook).subscribe((res) => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Book Updated Successfully',
        showConfirmButton: false,
        timer: 1000
      }).then((result)=>{
        this.router.navigate(['/home']);
      });
    });
      };
}
