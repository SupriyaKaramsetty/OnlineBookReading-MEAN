import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { Book } from '../models/book.model';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import decode from 'jwt-decode';


const domain = 'http://localhost:5000';
const getAllBooksEndPoint = domain + '/book/list';
const getBookDetailEndPoint = domain + '/book/detail/';
const getSingleBookEndPoint= domain + '/book/'
const createBookEndpoint = domain + '/book/create';
const updateBookEndPoint = domain + '/book/update/';
const deleteBookEndPoint = domain + '/book/delete/';
const addBookToWantToReadEndPoint = domain + '/book/my-library/wantToRead/';
const addBookToCurrentlyReadingEndPoint = domain + '/book/my-library/currentlyReading/';
const addBoookToReadEndPoint = domain + '/book/my-library/read/';
const realtedBooksEndPoint = domain + '/book/relatedBooks/'
const getBookToWantToReadEndPoint = domain + '/book/my-library/getWantToRead';
const getCurrentlyReadingBooksEndPoint = domain + '/book/my-library/getCurrentlyReading';
const getReadBooksEndPoint = domain + '/book/my-library/getRead';
const allLibraryBooksEndPoint = domain + '/book/my-library';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  filterQuery = new Subject<string>();
  bookRating = new Subject<number>();
  booksChanged = new Subject<Book[]>();
  wChanged = new Subject<any>();
  cChanged = new Subject<any>();
  rChanged = new Subject<any>();
  
  
  bookOnViewDetailChanged = new Subject<any>();
  bookDeleted = new Subject<any>();
  

  booksByGenre: Book[] = [];
  relatedBooks: Book[] = [];
  wantToReadBooks: Book[] =[];
  currentlyReadingBooks: Book[] = [];
  readBooks: Book[] = [];

  currentUser  !: any;
  constructor(private authService: AuthService,
    private http : HttpClient) {
        this.currentUser = this.authService.user;
     }


     allBooks(): Observable<Book[]> {
      return this.http.get<Book[]>(getAllBooksEndPoint);
    }


     getBookDetail(id: string) :Observable<Book>{ 
      return this.http.get<Book>(getBookDetailEndPoint+id);
    }


    getSingleBook(id: string) :Observable<Book>{
      return this.http.get<Book>(getSingleBookEndPoint+id);
    }

    createSingleBook(payload: object) : Observable<Book>{
      return this.http.post<Book>(createBookEndpoint,payload,
        {
          headers: {
            authorization: "Bearer " + this.authService.getToken()
          }
        });
    }

    updateSingleBook(id: string, payload: any): Observable<Book> {
      return this.http.patch<Book>(updateBookEndPoint + id, payload,
        {
          headers: {
            authorization: "Bearer " + this.authService.getToken()
          }
        });
    }

    deleteSingleBook(id: string):Observable<Book>{
      return this.http.delete<Book>(deleteBookEndPoint + id,
        {
          headers: {
            authorization: "Bearer " + this.authService.getToken()
          }
        });
    }

    getWantToReadBooks() : Observable<Book[]>{
      return this.http.get<Book[]>(getBookToWantToReadEndPoint,
        {
          headers: {
            authorization: "Bearer " + this.authService.getToken()
          }
        })
    }

  //currentlyReading Books
 

    getcurrentlyReadingBooks() : Observable<Book[]>{
      return this.http.get<Book[]>(getCurrentlyReadingBooksEndPoint,
        {
          headers: {
            authorization: "Bearer " + this.authService.getToken()
          }
        })
    }

  //read books


    getReadBooks() :  Observable<Book[]>{
      return this.http.get<Book[]>(getReadBooksEndPoint,
        {
          headers: {
            authorization: "Bearer " + this.authService.getToken()
          }
        })
    }

  // IN LIBRARY:

   //want to read books
    addBookToWantToRead(bookid: string ,email:string):Observable<Book>{
      return this.http.post<Book>(addBookToWantToReadEndPoint + bookid,email,{
          headers: {
            authorization: "Bearer " + this.authService.getToken()
          }
        })
      }

  //currentlyReading Books
    addBookToCurrentlyReading(bookid: any,email:any) : Observable<Book>{
      return this.http.post<Book>( addBookToCurrentlyReadingEndPoint+ bookid,email,{
          headers: {
            authorization: "Bearer " + this.authService.getToken()
          }
      });
      }


  //read books
    addBookToRead(bookid: any,email:any) : Observable<Book>{
      console.log(this.authService.getToken());
    return this.http.post<Book>( addBoookToReadEndPoint+ bookid,email,{
        headers: {
          authorization: "Bearer " + this.authService.getToken()
        }
    });
    }

    getRelatedBooks(bookData: string) : Observable<Book[]>{
      console.log("in related" + bookData);
    return this.http.get<Book[]>(realtedBooksEndPoint + bookData);
    }


    getLibraryBooks() : Observable<Book[]>{
      return this.http.get<Book[]>(allLibraryBooksEndPoint,{
        headers: {
          authorization: "Bearer " + this.authService.getToken()
        }
      });
    }
}
