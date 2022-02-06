import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/core/models/book.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { BookService } from 'src/app/core/services/book.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-my-library',
  templateUrl: './my-library.component.html',
  styleUrls: ['./my-library.component.css']
})
export class MyLibraryComponent implements OnInit {

  
  wantToReadBooksLength !: number;
  currentlyReadingBooksLength !: number;
  readBooksLength !: number;
  libraryBooks : Book[] = [];
  wantToReadStyle = false;
  readingStyle = false;
  readStyle = false;
  allBooksStyle = false;
  constructor(private authService: AuthService, 
    private bookService: BookService,
    private userService: UserService) { 
      
    }

  ngOnInit(): void {
    const email = this.authService.getUser();
    this.allBooksStyle = true;
    this.bookService.getLibraryBooks().subscribe((res) => {
      this.libraryBooks = res;
    })
  }
  

  allBooks(){
    this.allBooksStyle = true;
    this.wantToReadStyle = false;
    this.readingStyle = false;
    this.readStyle = false;
    this.bookService.getLibraryBooks().subscribe((res) => {
      this.libraryBooks = res;
    })
  }
  wantToReadBooks(){
    this.wantToReadStyle = true;
    this.readingStyle = false;
    this.readStyle = false;
    this.allBooksStyle = false;
    this.bookService.getWantToReadBooks().subscribe(res => {
        this.libraryBooks = res;
        this.wantToReadBooksLength = res.length;
      }
    )
      };
  

  currentlyReadingBooks(){
    this.readingStyle = true;
    this.wantToReadStyle = false;
    this.readStyle = false;
    this.allBooksStyle = false;
    this.bookService.getcurrentlyReadingBooks().subscribe( res => this.libraryBooks = res
    )
  }

  readBooks(){
    this.readStyle = true;
    this.wantToReadStyle = false;
    this.readingStyle = false;
    this.allBooksStyle = false;
    this.bookService.getReadBooks().subscribe(res => this.libraryBooks = res
    )
  }

}
