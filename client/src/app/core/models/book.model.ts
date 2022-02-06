
import { Review } from './review.model';

export class Book {
  constructor(
    public _id:string,
    public title: string,
    public author: string,
    public genre: string,
    public release_year: number,
    public description: string,
    public cover: string,
    public pdf: string,
    public pageCount: number,
    public currentRating?: number,
    public reviews?: string[],
    public bookStatus?: string
  ) { }
}