import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  bookForm!: FormGroup;
  selectedSort: string = '';
  notFound: boolean = false;
  isEditMode = false;
  textSuccess: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private bookService: BookService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.getBooks();
    this.bookService.searchTitle.subscribe((title) => {
      this.searchBooksByTitle(title);
    });
    this.initializeForm();
  }

  initializeForm(): void {
    this.bookForm = this.fb.group({
      id: [null],
      title: ['', Validators.required],
      subtitle: ['', Validators.required],
      author: [''],
      published: [''],
      publisher: ['', Validators.required],
      image: ['', Validators.required],
      pages: [''],
      price: ['', Validators.required],
      rate: [''],
      salePrice: [''],
      quantity: ['', Validators.required],
      categories: [''],
      description: ['', Validators.required],
      website: [''],
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

  addToCart(item: Book): void {
    this.cartService.addToCart(item, 1);
  }

  openModal(book?: Book): void {
    if (book) {
      this.isEditMode = true;
      this.bookForm.setValue(book);
    } else {
      this.isEditMode = false;
      this.bookForm.reset();
    }
  }

  submitForm(): void {
    if (this.isEditMode) {
      this.updateBook();
    } else {
      this.addBook();
    }
  }

  addBook(): void {
    this.bookService.addBook(this.bookForm.value).subscribe(() => {
      this.getBooks();
      document.getElementById('cancel')?.click();
      this.textSuccess = 'Add successfully';
      document.getElementById('showSuccess')?.click();
    });
  }

  updateBook(): void {
    const id = this.bookForm.value.id;
    this.bookService.updateBook(id, this.bookForm.value).subscribe(() => {
      this.getBooks();
      document.getElementById('cancel')?.click();
      this.textSuccess = 'Update successfully';
      document.getElementById('showSuccess')?.click();
    });
  }

  deleteBook(id: number): void {
    this.bookService.deleteBook(id).subscribe(() => {
      this.getBooks();
      document.querySelector('.modal-backdrop.fade.show')?.remove();
      this.textSuccess = 'Deleted successfully';
      document.getElementById('showSuccess')?.click();
    });
  }

  public isAdmin(): boolean {
    return this.authService.getUserRoles().includes('admin');
  }
}
