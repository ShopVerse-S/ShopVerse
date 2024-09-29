package com.example.ecommerce.service;

import com.example.ecommerce.dao.ProductRepository;
import com.example.ecommerce.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.PageRequest;



import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProductsByCategory(Long categoryId) {
        int page = 0;           // Start with the first page
        int size = 12;          // Define page size (you can adjust this)
        List<Product> allProducts = new ArrayList<>();
        Page<Product> productPage;   // To hold paginated results

        // Loop through all pages
        do {
            Pageable pageable = PageRequest.of(page, size); // Create pageable object
            productPage = productRepository.findByCategoryId(categoryId, pageable);
            allProducts.addAll(productPage.getContent());   // Add products to the list
            page++;   // Move to the next page
        } while (productPage.hasNext());   // Continue until the last page is reached

        return allProducts;
    }
}
