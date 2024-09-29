import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Import FormsModule for ngModel

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  standalone: true,
  imports: [FormsModule]  // Add FormsModule here
})
export class ForgotPasswordComponent {
  email: string = '';  // Add the email property

  onForgotPassword() {
    // Handle forgot password logic here
    console.log('Forgot password for:', this.email);
  }
}
