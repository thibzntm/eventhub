// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  private isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.checkSession(); // Vérifie la session au démarrage du service
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => {
        const user = users.find(user => user.email === credentials.email && user.password === credentials.password);
        if (user) {
          this.setSession(user);
        }
        return user;
      })
    );
  }

  register(userData: any): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}?email=${userData.email}`).pipe(
      map(users => {
        if (users.length > 0) {
          throw new Error('User already exists');
        } else {
          return this.http.post<any>(this.apiUrl, userData);
        }
      })
    );
  }

  logout() {
    this.isLoggedIn.next(false);
    localStorage.removeItem('user');
  }

  get isUserLoggedIn() {
    return this.isLoggedIn.asObservable();
  }

  setSession(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
    this.isLoggedIn.next(true);
  }

  checkSession() {
    const user = localStorage.getItem('user');
    if (user) {
      this.isLoggedIn.next(true);
    } else {
      this.isLoggedIn.next(false);
    }
  }
}
