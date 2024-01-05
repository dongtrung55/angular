import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  titleForm = 'Register Form';
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

  constructor(private authService: AuthService, private http: HttpClient) { }

  ngOnInit(): void { }

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
            this.errorMessageEmail = 'Email is already taken.';
          } else {
            this.errorMessageEmail = '';
          }
        },
        (error) => {
          console.error('Error checking email existence:', error);
        }
      );
    }
  }

  public validateUserName(): void {
    if (!this.userName) {
      this.errorMessageUserName = 'Please enter user name.';
    } else if (this.userName.length > 20) {
      this.errorMessageUserName = 'User name must not exceed 20 characters.';
    } else {
      this.checkFieldExists('username', this.userName).subscribe(
        (existingUser) => {
          if (existingUser) {
            this.errorMessageUserName = 'Username is already taken.';
          } else {
            this.errorMessageUserName = '';
          }
        },
        (error) => {
          console.error('Error checking username existence:', error);
        }
      );
    }
  }

  public validatePassword(): void {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!this.password) {
      this.errorMessagePassword = 'Please enter password.';
    } else if (this.password.length < 8) {
      this.errorMessagePassword = 'Password must be at least 8 characters.';
    } else if (!passwordRegex.test(this.password)) {
      this.errorMessagePassword =
        'Password must include at least one letter, one number, and one special character.';
    } else {
      this.errorMessagePassword = '';
    }
  }

  public validateFirstName(): void {
    if (!this.firstName) {
      this.errorMessageFirstName = 'Please enter first name.';
    } else if (this.firstName.length > 25) {
      this.errorMessageFirstName = 'First name must not exceed 25 characters.';
    } else {
      this.errorMessageFirstName = '';
    }
  }

  public validateLastName(): void {
    if (!this.lastName) {
      this.errorMessageLastName = 'Please enter last name.';
    } else if (this.lastName.length > 25) {
      this.errorMessageLastName = 'Last name must not exceed 25 characters.';
    } else {
      this.errorMessageLastName = '';
    }
  }

  public validatePhone(): void {
    const phoneRegex = /^\d{10}$/; // Assuming a 10-digit phone number format

    if (!this.phone) {
      this.errorMessagePhone = 'Please enter phone number.';
    } else if (!phoneRegex.test(this.phone)) {
      this.errorMessagePhone = 'Please enter a valid 10-digit phone number.';
    } else {
      this.errorMessagePhone = '';
    }
  }

  public validateAddress(): void {
    if (!this.address) {
      this.errorMessageAddress = 'Please enter address.';
    } else if (this.address.length > 100) {
      this.errorMessageLastName = 'Address must not exceed 100 characters.';
    } else {
      this.errorMessageAddress = '';
    }
  }

  public onRegister(): void {
    this.validateUserName();
    this.validateEmail();
    this.validatePassword();
    this.validateFirstName();
    this.validateLastName();
    this.validatePhone();
    this.validateAddress();

    if (this.hasValidationErrors()) {
      return;
    }

    //insert user
    let user: any = {
      "username": this.userName,
      "email": this.email,
      "password": this.password,
      "first_name": this.firstName,
      "last_name": this.lastName,
      "last_ip": "",
      "role": "customer",
      "logins_count": 0,
      "created_at": (new Date()).toISOString(),
      "updated_at": "",
      "last_login": "",
      "email_verified": false
    };

    this.addUser(user).subscribe(
      () => {
        console.log('Users updated successfully.');
      },
      error => {
        console.error('Error updating users:', error);
      }
    );
  }

  private hasValidationErrors(): boolean {
    let hasValidationErrors = false;
    if (
      this.errorMessageUserName !== '' ||
      this.errorMessageEmail !== '' ||
      this.errorMessagePassword !== '' ||
      this.errorMessageFirstName !== '' ||
      this.errorMessageLastName !== '' ||
      this.errorMessagePhone !== '' ||
      this.errorMessageAddress !== ''
    ) {
      hasValidationErrors = true;
    }
    return hasValidationErrors;
  }

  private checkFieldExists(fieldName: string, fieldValue: string) {
    const url = 'http://localhost:3000/users';

    return this.http.get<any[]>(url).pipe(
      catchError((error) => {
        console.error('Error reading users.json:', error);
        return throwError(error);
      }),
      map((users) => users.some((user) => user[fieldName] === fieldValue))
    );
  }

  private addUser(user: any): Observable<any> {
  const apiUrl = 'http://localhost:3000/users';

  return this.http.get<any[]>(apiUrl).pipe(
    catchError((error) => {
      console.error('Error reading users.json:', error);
      return throwError(error);
    }),
    map((users) => {
      // Generate a new user_id
      user.id = (users.length + 1).toString();
      users.push(user);

      // Write updated data back to the file
      return this.http.post<any>(apiUrl, user).pipe(
        catchError((error) => {
          console.error('Error adding user:', error);
          return throwError(error);
        })
      );
    })
  );
}

}
