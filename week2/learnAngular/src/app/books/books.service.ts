import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Book } from './book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrlBooks = 'http://localhost:3000/books';
  private searchTitleSubject = new BehaviorSubject<string>('');
  searchTitle = this.searchTitleSubject.asObservable();

  constructor(private http: HttpClient) {}


  public getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrlBooks).pipe(
      catchError((error) => {
        console.error('Error getting books:', error);
        return throwError(error);
      })
    );
  }

  public getBookById(bookId: number): Observable<Book> {
    const url = `${this.apiUrlBooks}/${bookId}`;
    return this.http.get<Book>(url).pipe(
      catchError((error) => {
        console.error(`Error getting book with ID ${bookId}:`, error);
        return throwError(error);
      })
    );
  }

  public searchBooksByTitle(title: string): Observable<Book[]> {
    if (!title || title === "") {
      return this.getBooks();
    }

    const url = `${this.apiUrlBooks}?title_like=${title}`;
    return this.http.get<Book[]>(url).pipe(
      catchError((error) => {
        console.error(`Error searching books by title ${title}:`, error);
        return throwError(error);
      })
    );
  }

  public sortBooksByProperty(property: string): Observable<Book[]> {
    const url = `${this.apiUrlBooks}?_sort=${property}`;
    return this.http.get<Book[]>(url).pipe(
      catchError((error) => {
        console.error(`Error sorting books by property ${property}:`, error);
        return throwError(error);
      })
    );
  }

  public addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrlBooks, book);
  }

  public updateBook(id: number, book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrlBooks}/${id}`, book);
  }

  public deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlBooks}/${id}`);
  }

}
