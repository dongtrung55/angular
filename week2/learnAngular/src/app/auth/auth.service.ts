import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  users: any[] = [];
  private currentUser: any = null;

  constructor(private router: Router, private http: HttpClient) {
    this.checkLocalStorage();
    this.loadUsers();
  }

  private checkLocalStorage(): void {
    const userInLocalStorage = localStorage.getItem('currentUser');
    if (userInLocalStorage) {
      this.loggedIn.next(true);
    }
  }

  private loadUsers(): void {
    this.http.get<any[]>('./assets/users.json').subscribe(
      data => {
        this.users = data;
      },
      error => {
        console.error('Error loading users:', error);
      }
    );
  }

  private saveUsersToFile(): void {
    this.http.put('./assets/users.json', this.users).subscribe(
      () => {
        console.log('Users updated successfully.');
      },
      error => {
        console.error('Error updating users:', error);
      }
    );
  }

  public getUserRoles(): string {
    const userInLocalStorage = localStorage.getItem('currentUser');
    if (userInLocalStorage !== null) {
      const userObject = JSON.parse(userInLocalStorage);
      return userObject['role'];
    } else {
      return this.currentUser ? this.currentUser['role'] : '';
    }
  }

  public logout(): void {
    localStorage.removeItem('currentUser');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  public login(email: string, password: string, remember: boolean): Observable<boolean> {
    const user = this.users.find(u => u.email === email && u.password === password);
    const currentDate = new Date();
    const formattedDateTime = currentDate.toISOString();

    if (user) {
      this.currentUser = user;
      this.loggedIn.next(true);
      localStorage.setItem('currentUser', JSON.stringify(user));
      remember ? localStorage.setItem('remember', JSON.stringify({ email: user.email, password: user.password })) : localStorage.removeItem('remember');
      this.router.navigate(['/home']);
      user.last_login = formattedDateTime;
      // this.saveUsersToFile();
      return of(true);
    } else {
      this.loggedIn.next(false);
      return of(false);
    }
  }

  public isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  public getName(): Observable<string | null> {
    const userInLocalStorage = localStorage.getItem('currentUser');
    if (userInLocalStorage !== null) {
      const userObject = JSON.parse(userInLocalStorage);
      const userName = userObject['first_name'] + ' ' +userObject['last_name'];
      return of(userName);
    } else if(this.currentUser !== null) {
      const userName =  this.currentUser['first_name'] + ' ' + this.currentUser['last_name'];
      return of(userName);
    } else {
      return of(null);
    }
  }
}
