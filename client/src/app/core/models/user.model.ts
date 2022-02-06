
import { Book } from './book.model';

export class User {
  constructor(
    public username: string,
    public isAdmin: boolean,
    public _id: string,
    public wantToReadBooks: Book[],
    public currentlyReadingBooks: Book[],
    public readBooks: Book[],
  ) { }
}