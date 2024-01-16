import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  total: number = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotal();
  }

  get cartItemCount(): number {
    return this.cartService.getCartItems().length;
  }

  decrementQuantity(item: any): void {
    if (item.cart_quantity > 1) {
      item.cart_quantity--;
      this.updateCart();
    }
  }

  incrementQuantity(item: any): void {
    item.cart_quantity++;
    this.updateCart();
  }

  removeItem(item: any): void {
    const index = this.cartItems.indexOf(item);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.updateCart();
    }
  }

  getTotalPrice(item: any): number {
    if(item.salePrice > 0){
      return item.salePrice * item.cart_quantity;
    }else{
      return item.price * item.cart_quantity;
    }
  }

  private updateCart(): void {
    this.cartService.updateCartItemCount();
    this.cartService.saveCartToStorage();
  }

  calculateTotal(): void {
    this.total = this.cartItems.reduce((sum, item) => sum + item.price * item.cart_quantity, 0);
  }

  proceedToCheckout(): void {
    this.router.navigate(['/checkout']);
  }
}
