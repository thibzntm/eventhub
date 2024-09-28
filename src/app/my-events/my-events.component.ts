// my-events.component.ts
import { Component, OnInit } from '@angular/core';
import { EventService } from '../shared/services/event.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css']
})
export class MyEventsComponent implements OnInit {
  events: any[] = [];
  userEmail: string = '';

  constructor(
    private eventService: EventService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser(); // Récupérer l'utilisateur connecté
    if (user && user.email) {
      this.userEmail = user.email; // Récupérer l'email du propriétaire
      this.loadMyEvents();
    } else {
      console.error('User is not logged in or email is missing');
    }
  }

  loadMyEvents(): void {
    this.eventService.getEventsByOwner(this.userEmail).subscribe(
      (events) => {
        this.events = events; // Filtre les événements par propriétaire
      },
      (error) => {
        console.error('Error fetching events', error);
      }
    );
  }

  deleteEvent(eventId: string): void {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(eventId).subscribe(
        () => {
          this.events = this.events.filter(event => event.id !== eventId);
          console.log('Event deleted successfully');
        },
        (error) => {
          console.error('Failed to delete event', error);
        }
      );
    }
  }
}
