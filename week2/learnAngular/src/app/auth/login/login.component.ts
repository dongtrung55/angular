import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  remember: boolean = false;
  errorMessage: string = '';
  errorMessageEmail: string = '';
  errorMessagePassword: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const rememberStored = localStorage.getItem('remember');

    if (rememberStored) {
      const storedUser = JSON.parse(rememberStored);
      this.email = storedUser['email'];
      this.password = storedUser['password'];
      this.remember = true;
    }
  }

  private isEmailValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  public onKeyUp(event: any): void {
    const inputValue = event.target.value;
    if (!this.isEmailValid(inputValue)) {
      this.errorMessageEmail = 'Please enter a valid email address.';
    } else {
      this.errorMessageEmail = '';
    }
  }

  public onLogin(): void {
    if (!this.email) {
      this.errorMessageEmail = 'Please enter email.';
    } else {
      this.errorMessageEmail = '';
    }
    
    if (!this.password) {
      this.errorMessagePassword = 'Please enter password.';
    } else {
      this.errorMessagePassword = '';
    }
    
    if (!this.email || !this.password) {
      return;
    }

    if (!this.isEmailValid(this.email)) {
      this.errorMessageEmail = 'Please enter a valid email address.';
      return;
    }

    this.authService.login(this.email, this.password, this.remember).subscribe(
      (success) => {
        if (!success) {
          this.errorMessage = 'Invalid email or password';
        }
      },
      (error) => {
        console.error('Error during login:', error);
        this.errorMessage = 'An error occurred during login';
      }
    );
  }
}
