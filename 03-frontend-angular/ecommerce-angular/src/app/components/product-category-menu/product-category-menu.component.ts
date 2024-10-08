import { Component, OnInit } from '@angular/core';
import { ProductCategory } from '../../common/product-category';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrl: './product-category-menu.component.css',
})
export class ProductCategoryMenuComponent implements OnInit {
  productCategories: ProductCategory[] = [];
  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.listProductCategories();
  }
  listProductCategories() {
    this.productService.getProductCategories().subscribe((data) => {
      console.log('Product categories: ' + JSON.stringify(data));
      this.productCategories = data;
            //console.log('API Response Data:', data);

            // Extract product categories from the nested structure
            //this.productCategories = data._embedded.productCategory;

            // Optionally log the product categories for verification
            //console.log('Product Categories:', this.productCategories);
    });
  }
}
