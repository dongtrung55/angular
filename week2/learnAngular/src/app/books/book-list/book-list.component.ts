import { Component } from '@angular/core';
import { BookService } from '../books.service';
import { AuthService } from 'src/app/auth/auth.service';
import { CartService } from '../../cart/cart/cart.service';
import { Book } from '../book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent {
  books!: Book[];
  itemsPerPage = 6;
  currentPage = 1;
  selectedSort: string = '';
  notFound: boolean = false;
  isEditMode = false;
  textSuccess: string = '';

  constructor(
    private authService: AuthService,
    private bookService: BookService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getBooks();
    this.bookService.searchTitle.subscribe((title) => {
      this.searchBooksByTitle(title);
    });
  }

  getBooks(): void {
    this.bookService.getBooks().subscribe((books) => {
      this.books = books;
    });
  }

  searchBooksByTitle(title: string): void {
    this.bookService.searchBooksByTitle(title).subscribe((books) => {
      this.books = books;
      this.notFound = false;
      if (books.length === 0) {
        this.notFound = true;
      }
    });
  }

  sortBooksByProperty(property: string): void {
    this.bookService.sortBooksByProperty(property).subscribe((books) => {
      this.books = books;
    });
    this.selectedSort = property;
  }

  addToCart(book: Book[]): void {
    this.cartService.addToCart(book);
    this.cartService.updateCartItems(book);
  }

  addOrUpdateBook(book: Book): void {
    if (book) {
      this.bookService.updateBook(book.id, book).subscribe(() => {
        this.getBooks();
      });
    } else {
      this.bookService.addBook(book).subscribe(() => {
        this.getBooks();
      });
    }
  }

  deleteBook(id: number): void {
    this.bookService.deleteBook(id).subscribe(() => {
      this.getBooks();
    });
  }

  get totalPages(): number {
    return Math.ceil(this.books.length / this.itemsPerPage);
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get endIndex(): number {
    return this.startIndex + this.itemsPerPage;
  }

  get paginatedBooks(): any[] {
    return this.books.slice(this.startIndex, this.endIndex);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  public onPageChange(page: number): void {
    this.currentPage = page;
  }

  public isAdmin(): boolean {
    return this.authService.getUserRoles().includes('admin');
  }
}
