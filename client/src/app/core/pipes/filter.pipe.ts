import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  
  
  transform(value: any, searchValue: string): any {
    if(searchValue.toLowerCase().trim() === ""){
      return value;
    }
    const filteredBooks: any[] = [];
    for(const book of value){
      if(book['title'].toLowerCase().trim() === searchValue.toLowerCase().trim()){
        filteredBooks.push(book);
      }
      else if(book['author'].toLowerCase().trim() === searchValue.toLowerCase().trim()){
        filteredBooks.push(book);
      }
      else if(book['genre'].toLowerCase().trim() === searchValue.toLowerCase().trim()){
        filteredBooks.push(book);
      }
    }
    return filteredBooks;
  }



  
}
