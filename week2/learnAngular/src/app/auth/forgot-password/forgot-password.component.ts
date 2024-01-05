import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  userName: string = '';
  email: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';
  phone: string = '';
  address: string = '';
  errorMessage: string = '';
  errorMessageEmail: string = '';
  errorMessagePassword: string = '';
  errorMessageUserName: string = '';
  errorMessageFirstName: string = '';
  errorMessageLastName: string = '';
  errorMessagePhone: string = '';
  errorMessageAddress: string = '';

  constructor(private authService: AuthService, private http: HttpClient) {}

  ngOnInit(): void {}

  private isEmailValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  public validateEmail(): void {
    if (!this.email) {
      this.errorMessageEmail = 'Please enter email.';
    } else if (!this.isEmailValid(this.email)) {
      this.errorMessageEmail = 'Please enter a valid email address.';
    } else {
      this.checkFieldExists('email', this.email).subscribe(
        (existingEmail) => {
          if (existingEmail) {
            this.errorMessageEmail = '';
          } else {
            this.errorMessageEmail = 'Email does not exist';
          }
        },
        (error) => {
          console.error('Error checking email existence:', error);
        }
      );
    }
  }

  public onForgotPassword(): void {
    this.validateEmail();

    if (this.hasValidationErrors()) {
      return;
    }

    
  }

  private hasValidationErrors(): boolean {
    if (this.errorMessageEmail === '') {
      return false;
    } else {
      return true;
    }
  }

  private checkFieldExists(fieldName: string, fieldValue: string) {
    const url = './assets/users.json';

    return this.http.get<any[]>(url).pipe(
      catchError((error) => {
        console.error('Error reading users.json:', error);
        return throwError(error);
      }),
      map((users) => users.some((user) => user[fieldName] === fieldValue))
    );
  }
}

