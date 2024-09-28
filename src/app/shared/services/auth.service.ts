// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  private isLoggedInSubject = new BehaviorSubject<boolean>(false); // Utilisez `isLoggedInSubject` pour les abonnements
  isLoggedIn$ = this.isLoggedInSubject.asObservable(); // Observable pour `isLoggedIn`
  private currentUser: any = null;

  constructor(private http: HttpClient) {
    this.checkSession(); // Vérifie la session au démarrage du service
  }

  // Méthode de connexion
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => {
        const user = users.find(user => user.email === credentials.email && user.password === credentials.password);
        if (user) {
          this.setSession(user);
          return user;
        } else {
          throw new Error('Invalid credentials');
        }
      }),
      catchError(error => {
        throw new Error('Login failed');
      })
    );
  }

   // Méthode d'inscription corrigée
   register(userData: any): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}?email=${userData.email}`).pipe(
      mergeMap(users => {
        if (users.length > 0) {
          throw new Error('User already exists');
        } else {
          return this.http.post<any>(this.apiUrl, userData);
        }
      }),
      map(newUser => {
        this.setSession(newUser);
        return newUser;
      }),
      catchError(error => {
        throw new Error('Registration failed');
      })
    );
  }

  // Méthode de déconnexion
  logout() {
    this.isLoggedInSubject.next(false);
    this.currentUser = null;
    localStorage.removeItem('user');
  }

  // Récupère l'utilisateur actuel
  getCurrentUser() {
    if (!this.currentUser) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        this.currentUser = JSON.parse(storedUser);
      }
    }
    return this.currentUser;
  }

  // Définit la session pour l'utilisateur connecté
  setSession(user: any) {
    this.currentUser = user;
    localStorage.setItem('user', JSON.stringify(user));
    this.isLoggedInSubject.next(true);
  }

  // Vérifie la session au démarrage du service
  checkSession() {
    const user = this.getCurrentUser();
    if (user) {
      this.isLoggedInSubject.next(true);
    } else {
      this.isLoggedInSubject.next(false);
    }
  }

  // Observable pour savoir si l'utilisateur est connecté
  isUserLoggedIn(): Observable<boolean> {
    return this.isLoggedIn$;
  }
}
