import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product/service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from '../product/model/product.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css'],
})
export class ViewProductComponent implements OnInit {
  key?: string;
  product!: ProductModel;
  userType: string | null = null;

  constructor(
    private productService: ProductService,
    private actRouter: ActivatedRoute,
    private router: Router,
    private authService: AuthService // Injetando AuthService
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
    this.userType = this.authService.getUserType();
  }

  buyProduct() {
    const cartItems = sessionStorage.getItem('cart');
    if (cartItems) {
      const newCartItems = cartItems + `;${JSON.stringify(this.product)}`;
      sessionStorage.setItem('cart', newCartItems);
    } else {
      sessionStorage.setItem('cart', JSON.stringify(this.product));
    }
  }

  deleteProduct() {
    if (this.key) {
      this.productService.delete(this.key).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Erro ao excluir o produto:', error);
        }
      });
    }
  }
}
