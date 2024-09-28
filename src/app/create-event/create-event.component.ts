// create-event.component.ts
import { Component } from '@angular/core';
import { EventService } from '../shared/services/event.service'; // Assurez-vous que le chemin est correct
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

  constructor(private eventService: EventService, private router: Router) {}

  createEvent() {
    if (!this.title || !this.date || !this.location || !this.description) {
      console.error('All fields are required');
      return;
    }

    const newEvent = {
      title: this.title,
      date: this.date,
      location: this.location,
      description: this.description
    };

    this.eventService.createEvent(newEvent).subscribe(
      (response) => {
        console.log('Event created successfully', response);
        this.router.navigate(['/']); // Redirige vers la page d'accueil ou une autre page après la création
      },
      (error) => {
        console.error('Failed to create event', error);
      }
    );
  }
}
