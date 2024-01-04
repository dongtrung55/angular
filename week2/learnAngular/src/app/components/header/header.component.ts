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
    this.authService.getName().subscribe(
      (name) => {
        this.name = name;
      },
      (error) => {
        console.error('Error fetching user name:', error);
      }
    );
  }

  public logout(): void {
    this.authService.logout();
  }
}
