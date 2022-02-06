import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GenreService } from 'src/app/core/services/genre.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-genre',
  templateUrl: './create-genre.component.html',
  styleUrls: ['./create-genre.component.css']
})
export class CreateGenreComponent implements OnInit {

  submitted:boolean=false;
  createGenreForm !: FormGroup;
  
  constructor(private router: Router,private genreService: GenreService){}


  ngOnInit(): void {
    
    this.createGenreForm = new FormGroup({
      'genre_name': new FormControl('',[
        Validators.required])
    });
  }
  get createGenreFormControl(){
    return this.createGenreForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.genreService.createGenre(this.createGenreForm.value).subscribe((res) => {
    })
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Genre added Successfully',
      showConfirmButton: false,
      timer: 1000
    }).then((result)=>{
      this.router.navigate(['/browse']);
    });
      };
  
}
