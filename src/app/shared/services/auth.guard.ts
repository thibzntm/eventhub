// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service'; // Importez le AuthService pour vérifier l'état de connexion

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    let isLoggedIn = false;
    this.authService.isUserLoggedIn.subscribe(value => {
      isLoggedIn = value;
    });
    if (!isLoggedIn) {
      this.router.navigate(['/login']); // Redirige vers la page de connexion si non connecté
      return false;
    }
    return true;
  }
}
