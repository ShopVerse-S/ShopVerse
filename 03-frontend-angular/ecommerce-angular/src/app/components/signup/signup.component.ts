import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignupService } from '../../services/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private signupService: SignupService, private router: Router) {}

  onSignup() {
    const user = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.signupService.createAccount(user).subscribe(
      (response) => {
        console.log('Account created successfully', response);
        alert(response); // Display the response message
        this.router.navigate(['/login']); // Redirect to login after successful registration
      },
      (error) => {
        console.error('Error creating account', error);
        alert('Error on creating account.'); // Display a generic error message
      }
    );
  }
}
