import { Component, OnInit } from '@angular/core';

declare var bootstrap: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  isCartEmpty: boolean = true;

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.loadCartItems();
    }
  }

  loadCartItems(): void {
    const cart = sessionStorage.getItem('cart');
    if (cart) {
      this.cartItems = cart.split(';').map((item: string) => JSON.parse(item));
      this.isCartEmpty = this.cartItems.length === 0;
    }
  }

  removeItem(name: string, price: number): void {
    this.cartItems = this.cartItems.filter(item => item.name !== name || item.price !== price);
    sessionStorage.setItem('cart', this.cartItems.map(item => JSON.stringify(item)).join(';'));
    this.isCartEmpty = this.cartItems.length === 0;
  }

  finalizePurchase(): void {
    if (typeof window !== 'undefined') {
      this.cartItems = [];
      sessionStorage.removeItem('cart');
      this.isCartEmpty = true;
      this.showSuccessModal();
    }
  }

  showSuccessModal(): void {
    if (typeof window !== 'undefined') {
      const modalElement = document.getElementById('successModal');
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
    }
  }
}
