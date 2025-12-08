import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private items = new BehaviorSubject<any[]>([]);
  items$ = this.items.asObservable();

  addToCart(product: any) {
    const current = this.items.value;
    const existingItem = current.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += product.quantity || 1;
      this.items.next([...current]);
    } else {
      this.items.next([...current, { ...product, quantity: product.quantity || 1 }]);
    }
  }

  removeFromCart(productId: any) {
    const current = this.items.value;
    const filtered = current.filter(item => item.id !== productId);
    this.items.next(filtered);
  }

  updateCart(items: any[]) {
    this.items.next([...items]);
  }

  clearCart() {
    this.items.next([]);
  }

  getTotal() {
    return this.items.value.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  }
  
  constructor() { }
}
