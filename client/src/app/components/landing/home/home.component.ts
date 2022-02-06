import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from 'src/app/core/models/book.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { BookService } from '../../../core/services/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  filterValue: string = '';
searchForm !: FormGroup;
bookslist : Book[] = [];
 @Input() value !: string;
  constructor(private router: Router,
    private authService: AuthService,
    private bookService: BookService) { }

  ngOnInit(): void {
    this.form();
   this.bookService.allBooks().subscribe((books) => {
    this.bookslist = books;
    });

  }

  form(){
    this.searchForm = new FormGroup({
      'searchValue': new FormControl('', [
        Validators.required
      ])
    });
  }

  onSubmit(){
    this.value = this.searchForm.value.searchValue;
    if (this.value.length !== null) {
      this.filterValue = this.value;
    }
  }


}
