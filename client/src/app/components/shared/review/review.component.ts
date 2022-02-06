import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Review } from 'src/app/core/models/review.model';
import { ReviewService } from 'src/app/core/services/review.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  @Input('bookId') bookId !: string;
  @Input('isLogged') isLogged !: boolean;
  @Input('isAdmin') isAdmin !: boolean;
  @Input('userId') userId !: string;

  reviewForm !: FormGroup;
  reviews: Review[] = [];
  action !: string;

  constructor(private reviewService: ReviewService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.reviewForm = new FormGroup({
      'content': new FormControl('', Validators.required)
    });

    this.reviewService.getReviews(this.bookId).subscribe((res:any)=> {
      this.reviews=res.data;
    })
  }

  AddReview(){
    if(!this.isLogged){
      Swal.fire(
          'Login to Leave a Review'
      )
    }
    else{
     this.reviewService.addReview(this.bookId,this.reviewForm.value).subscribe((res) => {
      this.reviewService.getReviews(this.bookId).subscribe((res:any)=> {
        this.reviews=res.data;
      })
     });
    this.reviewForm.reset();
    }
  }

  onSubmit(): void {
      this.AddReview();
    }
  
  removeReview(reviewId:any): void {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.reviewService.deleteReview(reviewId).subscribe({
          next : res => {
          Swal.fire(
            'Review Deleted Successfully',
          )
          this.reviewService.getReviews(this.bookId).subscribe((res:any)=> {
            this.reviews=res.data;
          })
          },
          error: err => {
            Swal.fire(
              `${err.error.message}`,
            )
          }
        })
        }
        })
    .catch((result) => {
      return;
    });
    
  }
}
  

