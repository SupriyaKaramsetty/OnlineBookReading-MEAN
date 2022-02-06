import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GenreService } from 'src/app/core/services/genre.service';
import Swal from 'sweetalert2';
import { Book } from '../../../../core/models/book.model';
import { AuthService } from '../../../../core/services/auth.service';
import { BookService } from '../../../../core/services/book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit{


  max = 0;
  rating : number = 0; 
  isReadonly = false;
  book !: Book ;
  bookId: string = '';
  userId !: string;
  isLogged !: boolean;
  isAdmin !: boolean;
  books !: Book[];
  relatedBooks !: Book[];
  subscription!: Subscription;
  bookChangedSubscription !: Subscription;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService,
    private authService: AuthService,
    private genreService: GenreService
  ) {
  }


  ngOnInit(): void {
    this.bookId = this.route.snapshot.params['bookId'];
    this.isLogged = this.authService.isLoggedIn();
    this.isAdmin = this.authService.isAdmin();
      this.bookChangedSubscription =  this.bookService.bookOnViewDetailChanged.subscribe((data) => {
        this.book = data;
    })
    this.bookService.getBookDetail(this.bookId).subscribe((res)=> {
      console.log(res);
        this.book = res;
        this.book.description = res.description.substring(0,200) + "...";
    });
    this.bookService.getRelatedBooks(this.bookId).subscribe((res) => {
      this.relatedBooks = res;
    });
        this.bookChangedSubscription =  this.bookService.bookOnViewDetailChanged.subscribe((data) => {
          this.book = data;
        this.bookService.getRelatedBooks(this.book._id).subscribe((res) => {
          this.relatedBooks = res;
          this.router.navigate([`/book/detail/${data._id}`]);
        });
      });
  }

  
  readBook(): void {
      this.router.navigate([this.book.cover]);
  }


  login(): void {
    this.router.navigate(['/user/login']);
  }

  onUpdate(id: string){
    console.log(this.book);
    this.router.navigate([`book/update/${this.book._id}`]);
    
  }

  onDelete(id: string){
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then((result: any) => {
    if (result.isConfirmed) {
       this.bookService.deleteSingleBook(this.book._id).subscribe((res) => {
          console.log(res);   
        });
        this.bookService.allBooks().subscribe((res) => {
          console.log(res);
        })
      Swal.fire(
        'Deleted!',
        'This Book has been deleted.',
        'success'
      )
      this.router.navigate(['/home']);
    }
  }).catch((result) => {
    return;
  });
  }


  wantToRead(){
    this.book.bookStatus = "Want To Read";
     const email =  this.authService.getUser()
    this.bookService.addBookToWantToRead(this.bookId,email).subscribe((res) => {
      //swal
    });
  }

  currentlyReading(){
    this.book.bookStatus = "Reading";
    const email =  this.authService.getUser();
    this.bookService.addBookToCurrentlyReading(this.bookId,email).subscribe((res) => {
      //swal
    });

    
  }

  read(){
    this.book.bookStatus = "Read";
    const email =  this.authService.getUser();
    this.bookService.addBookToRead(this.bookId,email).subscribe((res) => {
      //swal
    });
  }

  ngOnDestroy() {
    this.bookChangedSubscription.unsubscribe();
  }
  
}
