import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoginPage: boolean = false;
showProductCategoryMenu: boolean = true;
showSidebar: boolean = true;
  constructor(private router: Router) {}

  ngOnInit(): void {
    // Check if the current route is the login page
    this.router.events.subscribe(() => {
      this.isLoginPage = this.router.url === '/login';
    const currentRoute = this.router.url;
    // Hide the product category menu on the login page
         const hiddenRoutes = ['/login', '/signup', '/forgot-password'];
          this.showProductCategoryMenu = !hiddenRoutes.includes(currentRoute);
          this.showSidebar = !hiddenRoutes.includes(currentRoute);

    });
  }
    // Method to check if the current page is the admin panel
    isAdminPage(): boolean {
      return this.router.url.startsWith('/admin');
    }



}
