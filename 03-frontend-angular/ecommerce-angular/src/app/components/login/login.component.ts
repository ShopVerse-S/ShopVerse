import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  isLoginPage: boolean = true;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    console.error('Login component initialized:');
  }

  onLogin(): void {
      this.authService.login(this.username, this.password).subscribe(
          response => {
              console.log(response);
              const user = response.user;
              //localStorage.setItem('userId', user.id);
              this.authService.setAuthStatus(true);// Update the auth status
              this.router.navigate(['/dashboard']); // Redirect after successful login
          },
          error => {
              console.error('Login failed:', error);
              alert('Login failed. Please check your credentials.');
          }
      );
  }
}
