import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs'; // Import 'of' for handling undefined case
import { BookService } from '../books.service';
import { Book } from '../book';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  book: Book | null = null;
  bookId: number = 0;

  constructor(private route: ActivatedRoute, private bookService: BookService) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const bookId = params.get('id');
        if (bookId !== null) {
          const numericBookId = parseInt(bookId, 10);
          return this.bookService.getBookById(numericBookId);
        } else {
          // If 'id' is not present, return an observable with a default value or handle it accordingly
          // Example: return of<Book>(/* default book or null */); 
          return of<Book | null>(null); // Replace with your specific logic
        }
      })
    ).subscribe(book => {
      this.book = book;
    });
  }
}
