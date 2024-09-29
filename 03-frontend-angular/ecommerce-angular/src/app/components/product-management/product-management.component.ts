import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { Category } from '../../interfaces/category';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {
  product: Product = {
    id: '',
    sku: '',
    name: '',
    description: '',
    unitPrice: 0,
    imageUrl: '',
    active: true,
    unitsInStock: 0,
    dateCreated: new Date(),
    lastUpdated: new Date(),
    category_id: ''
  };
  imagePreview: string = '';

  categories: Category[] = []; // Declare the categories property

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService, // Inject CategoryService
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCategories(); // Fetch categories when the component initializes
  }

  getCategories() {
    this.categoryService.getCategories().subscribe( // Use correct service variable
      (categories: Category[]) => {
        this.categories = categories; // Assign the fetched categories to the property
      },
      (error: any) => {
        console.error('Error fetching categories', error);
      }
    );
  }

  addProduct() {
    this.productService.createProduct(this.product).subscribe(
      response => {
        console.log('Product created successfully', response);
      },
      error => {
        console.error('Error creating product', error);
      }
    );
  }

    isAuthenticated(): boolean {
      return this.authService.isAuthenticated(); // Check if the user is authenticated
    }

    goToProductManagement() {
      this.router.navigate(['/product-management']); // Redirect to the product management route
    }
}
