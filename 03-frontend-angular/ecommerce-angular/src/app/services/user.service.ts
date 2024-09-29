import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
private apiUrl = 'https://localhost:8443/api/users';

  constructor(private http: HttpClient) {}
  login(username: string, password: string) {
    return this.http.post('https://localhost:8443/api/auth/login', { username, password });
  }
  register(user: User): Observable<any> {
    return this.http.post('/api/register', user);
  }

  getUserById(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  // Fetch all users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // Update user role
  updateUserRole(userId: number, newRole: string): Observable<any> {
    const updateRoleUrl = `${this.apiUrl}/${userId}/role`; // Example URL structure
    return this.http.put(updateRoleUrl, { role: newRole });
  }

  getUserDetails(): Observable<any> {
    return this.http.get(`${this.apiUrl}/me`); // Adjust the endpoint as needed
  }

  updateUserDetails(user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/me`, user); // Adjust the endpoint as needed
  }

}
