import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product/service/product.service';
import { ProductModel } from '../product/model/product.model';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export class IndexComponent implements OnInit {
  products!: ProductModel[];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAll().subscribe((dbProducts) => {
      const products = dbProducts as ProductModel[];
      this.products = products;
    });
  }
}
