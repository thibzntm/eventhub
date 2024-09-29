import { Component, OnInit } from '@angular/core';
import { EventService } from '../shared/services/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  events: any[] = [];
  filtered: any[] = [];  // Tableau pour stocker les événements filtrés
  searchQuery: string = ''; // Variable pour la barre de recherche

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe((data) => {
      this.events = data;
      this.filtered = data;  // Initialise les événements filtrés avec tous les événements
    });
  }

  // Méthode appelée quand l'utilisateur tape dans la barre de recherche
  filterEvents() {
    this.filtered = this.events.filter(event => 
      event.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
