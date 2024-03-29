import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { Roles } from '../../models/roles-enum';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: User | undefined;
  private userSubject = new Subject<User | undefined>();

  constructor(private router: Router) {}

  getCurrentUser(): User {
    const loggedInUser = localStorage.getItem('currentUser')
      ? JSON.parse(localStorage.getItem('currentUser') || '')
      : null;
    this.userSubject.next(this.currentUser || loggedInUser);

    return this.currentUser || loggedInUser;
  }

  getUserAsObservable(): Observable<User | undefined> {
    return this.userSubject.asObservable();
  }

  setCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));

    this.currentUser = user;
    this.userSubject.next(user);
  }

  isUserAuthenticated(): boolean {
    return !!this.getCurrentUser()?.id;
  }

  isUserAdmin(): boolean {
    return this.getCurrentUser()?.role === Roles.Admin;
  }

  logout(): void {
    this.currentUser = undefined;
    this.userSubject.next(undefined);
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
