import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private apiUrl = 'https://localhost:8443/api/auth/register'; // Backend endpoint for registration

  constructor(private http: HttpClient) { }

  // Specify responseType as 'text' to handle plain text response
  createAccount(user: any): Observable<string> {
    return this.http.post<string>(this.apiUrl, user, { responseType: 'text' as 'json' });
  }
}
