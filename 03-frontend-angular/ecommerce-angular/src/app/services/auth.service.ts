import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Store authentication status
  private authStatus = new BehaviorSubject<boolean>(false);
  // Observable to track the authentication state
  authStatus$ = this.authStatus.asObservable();
  private apiUrl = 'https://localhost:8443/api/auth/login';

  constructor(private http: HttpClient) {}

  /*login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ username, password });
    return this.http.post(this.apiUrl, body, { headers });
  }
  */

    // Simulate login success and emit authentication status as true
  login(username: string, password: string): Observable<any> { // Ensure it returns Observable<any>
      return this.http.post<any>('https://localhost:8443/api/auth/login', { username, password });
  }
/*logout() {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);}
*/
       setAuthStatus(status: boolean) {
           this.authStatus.next(status); // Update the BehaviorSubject
       }


      // Update auth status to false on logout

     logout(): void {
        this.authStatus.next(false);  // Emit false on logout
      }

    isLoggedIn(): boolean {
      return !!localStorage.getItem('token');
    }
      // Method to retrieve the authentication status
      isAuthenticated(): boolean {
        return this.authStatus.getValue();
      }
}

