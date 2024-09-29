import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {

  constructor(private router: Router) {}

  // Navigate to the user management section
  goToUserManagement() {
    this.router.navigate(['/admin/users']);
  }

  // Navigate to the product management section
  goToProductManagement() {
    this.router.navigate(['/admin/product-management']);
  }
    isAdminPage(): boolean {
      return this.router.url.startsWith('/admin');
    }
}
