// user-profil.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { EventService } from '../shared/services/event.service'; // Import EventService
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.css']
})
export class UserProfilComponent implements OnInit {
  name: string = '';
  email: string = '';
  favorites: any[] = [];
  subscriptions: any[] = [];
  isEditEnabled: boolean = false; // Indique si le mode d'édition est activé
  errorMessage: string = ''; // Message d'erreur éventuel

  constructor(private authService: AuthService, private eventService: EventService, private router: Router) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.name = user.name;
      this.email = user.email;
      this.loadFavorites(user.favorites);
      this.loadSubscriptions(user.mySubscriptions);
    } else {
      this.router.navigate(['/login']); // Redirige si l'utilisateur n'est pas connecté
    }
  }

  loadFavorites(favoriteIds: string[]): void {
    if (favoriteIds && favoriteIds.length > 0) {
      this.eventService.getEventsByIds(favoriteIds).subscribe(
        (events) => {
          this.favorites = events;
        },
        (error) => {
          console.error('Error loading favorites', error);
        }
      );
    }
  }

  loadSubscriptions(subscriptionIds: string[]): void {
    if (subscriptionIds && subscriptionIds.length > 0) {
      this.eventService.getEventsByIds(subscriptionIds).subscribe(
        (events) => {
          this.subscriptions = events;
        },
        (error) => {
          console.error('Error loading subscriptions', error);
        }
      );
    }
  }

  viewEventDetails(eventId: string): void {
    this.router.navigate(['/event', eventId]);
  }

  enableEdit(): void {
    this.isEditEnabled = true; // Activer le mode d'édition
  }

  saveChanges(): void {
    if (!this.name || !this.email) {
      this.errorMessage = 'All fields are required';
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
    const user = this.authService.getCurrentUser();
    if (user) {
      this.name = user.name;
      this.email = user.email;
    }
    this.errorMessage = '';
  }
}
