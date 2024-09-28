// menu.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isUserLoggedIn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  logout() {
    this.authService.logout();
  }
}
