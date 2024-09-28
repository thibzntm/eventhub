// event-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../shared/services/event.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  event: any;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService
  ) {}

  // event-detail.component.ts
  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id'); 
    if (eventId) {
      this.getEventDetails(eventId);
    }
  }


  getEventDetails(id: string): void {
    this.eventService.getEventById(id).subscribe( 
      (event) => {
        this.event = event;
      },
      (error) => {
        console.error('Error fetching event details', error);
      }
    );
  }
  
}
