import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Genre } from '../models/genre.model';
import { AuthService } from './auth.service';

const domain = 'http://localhost:5000';
const getAllGenresEndPoint = domain + '/genre/list';
const createGenreEndPoint = domain + '/genre/create';
const deleteGenreEndPoint = domain + '/genre/delete/';
const getSingleGenreEndPoint  = domain + "/genre/";


@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(private http:HttpClient,
    private authService: AuthService) { }

  getGenreById(id: string) : Observable<Genre>{
    return this.http.get<Genre>(getSingleGenreEndPoint+id);
  }

  getGenreList() : Observable<Genre[]>{
    return this.http.get<Genre[]>(getAllGenresEndPoint);
  }

  createGenre(genre_name:any) : Observable<Genre>{
      return this.http.post<Genre>(createGenreEndPoint,genre_name, {
        headers: {
          authorization: "Bearer " + this.authService.getToken()
        }
      });
  }

  deleteGenre(genreId:any) :Observable<Genre>{
    return this.http.delete<Genre>(deleteGenreEndPoint+genreId,
      {
        headers: {
          authorization: "Bearer " + this.authService.getToken()
        }
      });
  }
}


