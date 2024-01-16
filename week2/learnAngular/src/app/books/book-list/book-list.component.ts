import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../books.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent {
  books: any[] = [];
  itemsPerPage = 3;
  currentPage = 1;
  selectedSort: string = '';

  constructor(private router: Router, private bookService: BookService) {}

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
    });
  }

  sortBooksByProperty(property: string): void {
    this.bookService.sortBooksByProperty(property).subscribe((books) => {
      this.books = books;
    });
    this.selectedSort = property;
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

}