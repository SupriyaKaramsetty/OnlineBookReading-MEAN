import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../models/review.model';
import { AuthService } from './auth.service';
import { BookService } from './book.service';

const domain = 'http://localhost:5000';
const getReviewsEndPoint = domain +'/review/';
const addReviewEndPoint = domain + '/review/add/';
const deleteReviewEndPoint = domain + '/review/delete/';
@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private bookService: BookService,
    private http:HttpClient,
    private authService:AuthService) {}

  getReviews(bookId: string) : Observable<Review[]>{
      return this.http.get<Review[]>(getReviewsEndPoint+bookId);
  }
  addReview(bookId: string, content: string) : Observable<any> {
    return this.http.post(addReviewEndPoint+bookId,content,{
      headers: {
        authorization: "Bearer " + this.authService.getToken()
      }
    })
  }

  deleteReview(reviewId:string) : Observable<any> {
    return this.http.delete(deleteReviewEndPoint+reviewId,{
      headers: {
        authorization: "Bearer " + this.authService.getToken()
      }
    })
  }


}