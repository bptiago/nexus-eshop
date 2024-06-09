import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../product/model/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartItems?: ProductModel[];
  isCartEmpty = false;

  constructor() {}

  ngOnInit(): void {
    const items = sessionStorage.getItem('cart');
    if (items) {
      this.cartItems = items
        ?.split(';')
        .map((item) => JSON.parse(item) as ProductModel);
    } else {
      this.isCartEmpty = true;
    }
  }

  removeItem(itemName: string, itemPrice: string) {
    this.cartItems = this.cartItems?.filter(
      (item) => itemName !== item.name && itemPrice !== item.price
    );

    const itemsToString = this.cartItems
      ?.map((item) => JSON.stringify(item))
      .join(';');
    sessionStorage.setItem('cart', itemsToString!);

    if (this.cartItems?.length === 0) this.isCartEmpty = true;
  }
}
