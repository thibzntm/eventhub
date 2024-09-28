// edit-event.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../shared/services/event.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
  event: any = {
    title: '',
    date: '',
    location: '',
    description: '',
    maxPeople: 0,
    counter: 0,
    owner: ''
  };

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id'); // Récupérer l'ID de l'événement
    if (eventId) {
      this.loadEvent(eventId);
    }
  }

  loadEvent(id: string): void {
    this.eventService.getEventById(id).subscribe(
      (event) => {
        const currentUser = this.authService.getCurrentUser();
        if (event && event.owner === currentUser.email) { // Vérifie si l'utilisateur est le propriétaire
          this.event = event; // Charger l'événement dans le formulaire
        } else {
          console.error('Unauthorized or event not found');
          this.router.navigate(['/']); // Rediriger si l'utilisateur n'est pas le propriétaire
        }
      },
      (error) => {
        console.error('Error loading event', error);
      }
    );
  }

  updateEvent(): void {
    if (!this.event.title || !this.event.date || !this.event.location || !this.event.description || !this.event.maxPeople) {
      console.error('All fields are required');
      return;
    }

    this.eventService.updateEvent(this.event).subscribe(
      () => {
        console.log('Event updated successfully');
        this.router.navigate(['/my-events']); // Rediriger vers la gestion des événements après la mise à jour
      },
      (error) => {
        console.error('Failed to update event', error);
      }
    );
  }
}
