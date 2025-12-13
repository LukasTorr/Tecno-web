import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CartService } from '../../services/CarritoCompra/cart.service';

@Component({
  selector: 'app-cart-sidebar',
  templateUrl: './cart-sidebar.component.html',
  styleUrls: ['./cart-sidebar.component.css']
})
export class CartSidebarComponent implements OnInit {
  items: any[] = [];
  total = 0;
  @Output() close = new EventEmitter<void>();

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.items$.subscribe(items => {
      this.items = items;
      this.total = this.cartService.getTotal();
    });
  }

  removeItem(productId: any) {
    this.cartService.removeFromCart(productId);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  updateQuantity(productId: any, newQuantity: number) {
    if (newQuantity <= 0) {
      this.removeItem(productId);
    } else {
      const item = this.items.find(i => i.id === productId);
      if (item) {
        item.quantity = newQuantity;
        this.cartService.updateCart(this.items);
      }
    }
  }

  checkout() {
    if (this.items.length > 0) {
      console.log('Procesando compra:', this.items, 'Total:', this.total);
      // Aquí iría la lógica de compra
    }
  }
}
