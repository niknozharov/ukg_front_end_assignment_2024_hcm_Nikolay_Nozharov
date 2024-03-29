import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}
  url: string = 'http://localhost:3000/users';

  getUsers(): Observable<any> {
    return this.http.get(`${this.url}`);
  }

  addUser(user: User): Observable<any> {
    return this.http.post(`${this.url}`, user);
  }

  editUser(user: User): Observable<any> {
    return this.http.put(`${this.url}/${user.id}`, user);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
