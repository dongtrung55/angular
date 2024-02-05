import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: any[] = [];
  private cartItemCountSubject = new BehaviorSubject<number>(0);
  private cartItemsSubject = new BehaviorSubject<any[]>([]);
  cartItemCount$ = this.cartItemCountSubject.asObservable();
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cartItems = JSON.parse(storedCart);
    }
  }

  addToCart(item: any, number: number): void {
    const existingItem = this.cartItems.find(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItem) {
      existingItem.cart_quantity += number;
    } else {
      item.cart_quantity = number;
      this.cartItems.push(item);
    }

    this.updateCartItems();
    this.updateCartItemCount();
    this.saveCartToStorage();
  }

  getCartItems(): any[] {
    return this.cartItems;
  }

  public updateCartItemCount(): void {
    const count = this.cartItems.length;
    this.cartItemCountSubject.next(count);
    this.updateCartItems();
  }

  public saveCartToStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  updateCartItems(): void {
    this.cartItemsSubject.next(this.cartItems.slice());
  }
}
