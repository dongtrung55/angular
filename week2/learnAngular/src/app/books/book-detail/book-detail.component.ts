import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs'; // Import 'of' for handling undefined case
import { BookService } from '../books.service';
import { Book } from '../book';
import { CartService } from '../../cart/cart/cart.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  book: Book | null = null;
  bookId: number = 0;
  quantity: number = 1;

  constructor(private route: ActivatedRoute, private bookService: BookService, private cartService: CartService) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const bookId = params.get('id');
        if (bookId !== null) {
          const numericBookId = parseInt(bookId, 10);
          return this.bookService.getBookById(numericBookId);
        } else {
          return of<Book | null>(null);
        }
      })
    ).subscribe(book => {
      this.book = book;
    });


    this.route.paramMap.subscribe(params => {
      this.bookId = +params.get('id')!;
    });
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  addToCart(): void {
    const item = this.book;
  
    if (item) {
      this.cartService.addToCart(item, this.quantity);
      this.quantity = 1;
    } else {
      console.error("Item is null or undefined");
    }
  }
  
}
