import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product/service/product.service';
import { ProductModel } from '../product/model/product.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'], 
  
})
export class IndexComponent implements OnInit {
  products!: ProductModel[];
  userType: string | null = null;

  constructor(private productService: ProductService, private authService: AuthService) {}

  ngOnInit(): void {
    this.productService.getAll().subscribe((dbProducts) => {
      const products = dbProducts as ProductModel[];
      this.products = products;
    });
    this.userType = this.authService.getUserType();
  }
}
