import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'; // Adjust path as needed

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  isEditing: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUserDetails();
  }

  loadUserDetails() {
    // Fetch user details from the service
    this.userService.getUserDetails().subscribe(data => {
      this.user = data;
    });
  }

  toggleEdit() {
    if (this.isEditing) {
      // Call the service to update user details
      this.userService.updateUserDetails(this.user).subscribe(() => {
        this.isEditing = false;
      });
    } else {
      this.isEditing = true;
    }
  }
}
