import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'https://localhost:8443/api/product-category'; // Your API endpoint

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
      return this.http.get<Category[]>(this.apiUrl);
  }
}
