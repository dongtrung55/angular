import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  name: string | null = null;
  public isLoggedIn$: Observable<boolean> = new Observable<boolean>;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn();
    this.isLoggedIn$.subscribe((isLogged) => {
      if (isLogged) {
        this.authService.getName().subscribe((userName) => {
          this.name = userName;
        });
      }
    });
  }

  public logout(): void {
    this.authService.logout();
  }

  public isAdmin(): boolean {
    return this.authService.getUserRoles().includes('admin');
  }
}
