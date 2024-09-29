import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {
  isAuthenticated: boolean = false;
  username: string = '';
  userId: number = 0;
  constructor(
    private authService: AuthService,
    private userService: UserService  // Combine both services in a single constructor
  ) {}
  ngOnInit(): void {
    // Subscribe to auth status changes
        this.authService.authStatus$.subscribe((status: boolean) => {
          this.isAuthenticated = status;
          if (this.isAuthenticated) {
            this.getUserDetails(); // Get user details on login
          }
        });
  }

  getUserDetails() {
    // Simulate retrieving user details (e.g., from local storage or backend)
    this.username = 'Admin';  // Simulate full name; replace with dynamic value
  }

  logout() {
    // Implement your new logout logic here
    console.log('Logout clicked');
    this.authService.logout();
    this.isAuthenticated = false;
    this.username = '';

  }
}
