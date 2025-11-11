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
    this.items.next([...current, product]);
  }

  clearCart() {
    this.items.next([]);
  }

  getTotal() {
    return this.items.value.reduce((sum, item) => sum + item.price, 0);
  }
  
  constructor() { }
}
