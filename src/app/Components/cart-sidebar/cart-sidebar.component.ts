import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CartService } from '../../services/CarritoCompra/cart.service';

@Component({
  selector: 'app-cart-sidebar',
  templateUrl: './cart-sidebar.component.html'
})
export class CartSidebarComponent implements OnInit {
  items: any[] = [];
  total = 0;
  @Output() close = new EventEmitter<void>();

  constructor(private cart: CartService) {}

  ngOnInit() {
    this.cart.items$.subscribe(items => {
      this.items = items;
      this.total = this.cart.getTotal();
    });
  }
}
