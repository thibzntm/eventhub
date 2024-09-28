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

  // event.service.ts
  getEventById(id: string): Observable<any> { // Changez `id: number` en `id: string`
    return this.http.get(`${this.apiUrl}/${id}`);
  }


  createEvent(event: any): Observable<any> {
    return this.http.post(this.apiUrl, event);
  }
}
