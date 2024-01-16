import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from 'src/app/books/book';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: any[] = [];
  private cartItemCountSubject = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCountSubject.asObservable();

  private cartItemsSubject = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cartItems = JSON.parse(storedCart);
      this.updateCartItemCount();
    }
  }

  addToCart(item: any): void {
    const existingItem = this.cartItems.find((cartItem) => cartItem.id === item.id);
  
    if (existingItem) {
      existingItem.cart_quantity += 1;
    } else {
      item.cart_quantity = 1;
      this.cartItems.push(item);
    }
  
    this.updateCartItemCount();
    this.saveCartToStorage();
  }

  getCartItems(): any[] {
    return this.cartItems;
  }

  public updateCartItemCount(): void {
    const count = this.cartItems.length;
    this.cartItemCountSubject.next(count);
  }

  public saveCartToStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  updateCartItems(items: Book[]): void {
    this.cartItemsSubject.next(items);
  }
}
