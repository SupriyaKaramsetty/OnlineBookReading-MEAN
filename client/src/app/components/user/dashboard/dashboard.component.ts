import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/core/models/book.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { BookService } from 'src/app/core/services/book.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  books : Book[]=[];
  isAdmin !: boolean
  users : any[] = [];
  constructor(private router: Router,
    private authService: AuthService,
    private bookService: BookService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
  }

  viewCreate(){
      this.router.navigate(['book/create']);
      
  }
  viewAddGenre(){
    this.router.navigate(['genre/create']);
  }

  viewDeleteGenre(){
    this.router.navigate(['genre/delete']);
  }

  viewUsers(){
    this.userService.getAllUsers().subscribe((res) => {
        this.users = res;
    })
  }

  
}

