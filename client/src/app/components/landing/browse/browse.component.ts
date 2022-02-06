import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/core/models/book.model';
import { Genre } from 'src/app/core/models/genre.model';
import { FilterPipe } from 'src/app/core/pipes/filter.pipe';
import { BookService } from 'src/app/core/services/book.service';
import { GenreService } from 'src/app/core/services/genre.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css'],
  providers:[FilterPipe]
})
export class BrowseComponent implements OnInit {

  filterValue : string = '';
  allBooks : Book[] = [];
  bookslist : Book[] = [];
  genreList!:Genre[];
  fetchedGenreName !: string;
  constructor(private genreService: GenreService,private bookService: BookService) { 
   
    this.bookService.filterQuery.subscribe((query) => {
      this.filterValue = query;
      
    })
}

  ngOnInit(): void {
    this.genreService.getGenreList().subscribe((res) => {
      this.genreList = res;
    })
    this.bookService.allBooks().subscribe((books) => {
      this.bookslist = books;
      this.allBooks = books;
    }); 
  }

  chooseGenre(genreName:string){
    this.fetchedGenreName = genreName;
    this.bookslist = this.getBooksByGenre( this.fetchedGenreName);
  }

  getBooksByGenre(genreName:string){
   const booksByGenre = this.allBooks.filter((book: { genre: string; }) => {
      return genreName === book.genre;
    });
    return booksByGenre;
  }
 
}




 
  
  

