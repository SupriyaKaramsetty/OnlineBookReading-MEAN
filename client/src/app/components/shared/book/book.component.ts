import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { Book } from 'src/app/core/models/book.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { BookService } from 'src/app/core/services/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  @Input('home') home : boolean = false;
  @Input('book') book !: Book;
  @Input('library') library : boolean = true;
  @Input('csslibrary') csslibrary : boolean = true;
  @Input('relatedBooks') relatedBooks : boolean = false;
  bookId:string='';


  constructor(private bookService: BookService,
    private authService: AuthService,
    private router:Router) { 

    }

  ngOnInit(): void {
    this.bookId = this.book._id;
    
  }

  wantToRead(){
    this.book.bookStatus = "Want To Read";
      const email = this.authService.getUser()
    this.bookService.addBookToWantToRead(this.bookId,email).subscribe((res) => {
      this.bookService.wChanged.next(true);

    });    
  }

  currentlyReading(){
    this.book.bookStatus = "Reading";
    const email = this.authService.getUser()
    this.bookService.addBookToCurrentlyReading(this.bookId,email).subscribe((res) => {
      this.bookService.cChanged.next(true);
    });    
  }


  read(){
    this.book.bookStatus = "Read";
    const email = this.authService.getUser()
    this.bookService.addBookToRead(this.bookId,email).subscribe((res) => {
      this.bookService.rChanged.next(true);

    });    
   
  }

  onViewDetails() : Observable<any>{
    this.bookService.bookOnViewDetailChanged.next(this.book);
      return of({'book': 'xyz' });
  }



 
}
