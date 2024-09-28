// event.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:3000/events';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getEventById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getEventsByOwner(owner: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?owner=${owner}`);
  }

  getEventsByIds(ids: string[]): Observable<any[]> {
    const query = ids.map(id => `id=${id}`).join('&');
    return this.http.get<any[]>(`${this.apiUrl}?${query}`);
  }

  createEvent(event: any): Observable<any> {
    return this.http.post(this.apiUrl, event);
  }

  updateEvent(event: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${event.id}`, event); // Mettre à jour un événement par ID
  }

  deleteEvent(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
