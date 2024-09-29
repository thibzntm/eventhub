// event-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../shared/services/event.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  event: any;
  user: any;
  isFavorite: boolean = false;
  isSubscribed: boolean = false;
  isLoggedIn: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      this.getEventDetails(eventId);
    }

    this.authService.isUserLoggedIn().subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });
  }

  getEventDetails(id: string): void {
    this.eventService.getEventById(id).subscribe(
      (event) => {
        this.event = event;
        this.checkFavoriteAndSubscriptionStatus();
      },
      (error) => {
        console.error('Error fetching event details', error);
      }
    );
  }

  checkFavoriteAndSubscriptionStatus(): void {
    if (this.user) {
      this.isFavorite = this.user.favorites.includes(this.event.id);
      this.isSubscribed = this.user.mySubscriptions.includes(this.event.id);
    }
  }

  toggleFavorite(): void {
    if (this.isFavorite) {
      this.authService.removeFromFavorites(this.event.id).subscribe(
        (user) => {
          this.user = user;
          this.isFavorite = false;
        },
        (error) => {
          console.error('Error removing from favorites', error);
        }
      );
    } else {
      this.authService.addToFavorites(this.event.id).subscribe(
        (user) => {
          this.user = user;
          this.isFavorite = true;
        },
        (error) => {
          console.error('Error adding to favorites', error);
        }
      );
    }
  }

  toggleSubscription(): void {
    if (this.isSubscribed) {
      this.authService.unsubscribeFromEvent(this.event.id).subscribe(
        (user) => {
          this.user = user;
          this.isSubscribed = false;
          this.event.counter--; // Décrémenter le compteur de participants
          this.updateEventCounter(this.event);
        },
        (error) => {
          console.error('Error unsubscribing from event', error);
        }
      );
    } else {
      if (this.event.counter < this.event.maxPeople) {
        this.authService.subscribeToEvent(this.event.id).subscribe(
          (user) => {
            this.user = user;
            this.isSubscribed = true;
            this.event.counter++; // Incrémenter le compteur de participants
            this.updateEventCounter(this.event);
          },
          (error) => {
            console.error('Error subscribing to event', error);
          }
        );
      } else {
        alert('Maximum number of participants reached.');
      }
    }
  }

  updateEventCounter(event: any): void {
    this.eventService.updateEvent(event).subscribe(
      () => {
        console.log('Event counter updated successfully');
      },
      (error) => {
        console.error('Error updating event counter', error);
      }
    );
  }
}
