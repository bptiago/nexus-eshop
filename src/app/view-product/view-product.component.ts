import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product/service/product.service';
import { ActivatedRoute } from '@angular/router';
import { ProductModel } from '../product/model/product.model';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.css',
})
export class ViewProductComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private actRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.actRouter.paramMap.subscribe((paramMap) => {
      this.key = paramMap.get('key')?.toString();
      if (this.key) {
        this.productService.getByKey(this.key).subscribe((product: any) => {
          this.product = product;
        });
      }
    });
  }

  key?: string;
  product!: ProductModel;

  buyProduct() {
    const cartItems = sessionStorage.getItem('cart');
    if (cartItems) {
      const newCartItems = cartItems + `;${JSON.stringify(this.product)}`;
      sessionStorage.setItem('cart', newCartItems);
    } else {
      sessionStorage.setItem('cart', JSON.stringify(this.product));
    }
  }
}
