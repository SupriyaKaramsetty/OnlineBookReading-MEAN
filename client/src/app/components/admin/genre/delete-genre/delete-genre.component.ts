import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { Genre } from 'src/app/core/models/genre.model';
import { GenreService } from 'src/app/core/services/genre.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-genre',
  templateUrl: './delete-genre.component.html',
  styleUrls: ['./delete-genre.component.css']
})
export class DeleteGenreComponent implements OnInit {

  genreList : Genre[] = [];
  
  constructor(private genreService: GenreService) { }

  ngOnInit(): void {
    this.genreService.getGenreList().subscribe((res) => {
      this.genreList = res;
    });
  }

  deleteGenre(genreId:any){
            Swal.fire({
          title: 'Are you sure?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
        }).then((result: any) => {
          if (result.isConfirmed) {
            this.genreService.deleteGenre(genreId).subscribe((res) => {
              console.log(res);
            Swal.fire(
               'Genre Deleted Successfully'
            )
            this.genreService.getGenreList().subscribe((res) => {
              this.genreList = res;
            });
            // window.location.reload();
          })
        }
        }).catch((result) => {
          return;
        });
   
  }

}
