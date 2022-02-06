import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/landing/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule} from '@angular/common/http';
import { SharedModule } from './components/shared/shared.module';
import { MyCommonModule } from './components/layout/common.module';
import { FilterPipe } from './core/pipes/filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { BrowseComponent } from './components/landing/browse/browse.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
// import { GenreListComponent } from './components/genre/genre-list/genre-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BrowseComponent,
    FilterPipe
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MyCommonModule,
    SharedModule,
    ReactiveFormsModule,FormsModule,
    MatCardModule,
    NgbModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
