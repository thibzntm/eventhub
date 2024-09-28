// create-event.component.ts
import { Component } from '@angular/core';
import { EventService } from '../shared/services/event.service';
import { AuthService } from '../shared/services/auth.service'; // Importer AuthService
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent {
  title: string = '';
  date: string = '';
  location: string = '';
  description: string = '';
  owner: string = ''; // Ajouter le champ owner

  constructor(
    private eventService: EventService,
    private authService: AuthService, // Injecter AuthService
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser(); // Récupérer l'utilisateur connecté
    if (user && user.email) {
      this.owner = user.email; // Stocker l'email du propriétaire
    } else {
      console.error('User is not logged in or email is missing');
      this.router.navigate(['/login']); // Rediriger si l'utilisateur n'est pas connecté
    }
  }

  createEvent() {
    if (!this.title || !this.date || !this.location || !this.description) {
      console.error('All fields are required');
      return;
    }

    const newEvent = {
      title: this.title,
      date: this.date,
      location: this.location,
      description: this.description,
      owner: this.owner 
    };

    this.eventService.createEvent(newEvent).subscribe(
      (response) => {
        console.log('Event created successfully', response);
        this.router.navigate(['/']); 
      },
      (error) => {
        console.error('Failed to create event', error);
      }
    );
  }
}
