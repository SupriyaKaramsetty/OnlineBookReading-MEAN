import { Component, Input, OnInit } from '@angular/core';
import { BookService } from 'src/app/core/services/book.service';
import { GenreService } from 'src/app/core/services/genre.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent implements OnInit {

  @Input('genre') genre !: any;
  length !:number;
  constructor(private genreService: GenreService,private bookService: BookService) { }

  ngOnInit(): void {
  }

}
