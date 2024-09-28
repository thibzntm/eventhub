// user-profil.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.css']
})
export class UserProfilComponent implements OnInit {
  name: string = '';
  email: string = '';
  originalEmail: string = ''; // Utilisé pour comparaison si nécessaire
  isEditEnabled: boolean = false; // Indique si le mode d'édition est activé
  errorMessage: string = ''; // Message d'erreur éventuel

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.name = user.name;
      this.email = user.email;
      this.originalEmail = user.email;
    } else {
      this.router.navigate(['/login']); // Redirige si l'utilisateur n'est pas connecté
    }
  }

  enableEdit(): void {
    this.isEditEnabled = true; // Activer le mode d'édition
  }

  saveChanges(): void {
    if (!this.name || !this.email) {
      this.errorMessage = 'All fields are required';
      return;
    }

    // Vérifie si les données ont été modifiées
    if (this.email === this.originalEmail && this.name === this.authService.getCurrentUser().name) {
      this.isEditEnabled = false;
      return;
    }

    const updatedUser = {
      ...this.authService.getCurrentUser(),
      name: this.name,
      email: this.email
    };

    this.authService.updateCurrentUser(updatedUser).subscribe(
      (user) => {
        console.log('User profile updated successfully');
        this.isEditEnabled = false;
      },
      (error) => {
        this.errorMessage = 'Failed to update profile. Please try again later.';
        console.error('Error updating user profile', error);
      }
    );
  }

  cancelEdit(): void {
    this.isEditEnabled = false;
    // Réinitialiser les valeurs du formulaire
    const user = this.authService.getCurrentUser();
    if (user) {
      this.name = user.name;
      this.email = user.email;
    }
    this.errorMessage = '';
  }
}
