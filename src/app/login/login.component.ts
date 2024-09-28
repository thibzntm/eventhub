import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  loginUser() {
    this.authService.login({ email: this.email, password: this.password }).subscribe(
      (response) => {
        console.log(response);
        if (response) {  // Vérifie si un utilisateur a été trouvé
          this.authService.setSession(response);  // Crée une session avec l'utilisateur trouvé
          this.router.navigate(['/']);
        } else {
          console.error('Login failed: user not found');
        }
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }
  
  
}
