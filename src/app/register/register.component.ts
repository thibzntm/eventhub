// register.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  registerUser() {
    if (!this.name || !this.email || !this.password) {
      console.error('All fields are required');
      return;
    }
  
    const user = { name: this.name, email: this.email, password: this.password };
    this.authService.register(user).subscribe(
      (response) => {
        this.authService.setSession(response);
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Registration failed', error.message); // Affiche le message d'erreur
      }
    );
  }
}
