import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  changeRole(userId: number, newRole: string) {
    this.userService.updateUserRole(userId, newRole).subscribe(
      (response) => {
        console.log('User role updated', response);
        // Optionally, refresh the user list after the role change
        this.ngOnInit();
      },
      (error) => {
        console.error('Error updating user role', error);
      }
    );
  }
}
