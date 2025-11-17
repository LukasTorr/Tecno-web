import { Component } from '@angular/core';
import { CartService } from '../../services/CarritoCompra/cart.service';

@Component({
  selector: 'app-catalogo-snacks',
  templateUrl: './catalogo-snacks.component.html',
  styleUrls: ['./catalogo-snacks.component.css']
})
export class CatalogoSnacksComponent {
  snacks = [
    { id: 1, name: 'Ramitas Evercrisp', price: 2690, image: 'assets/image/snacks/ramitas.jpg' },
    { id: 2, name: 'Cheezels 200g', price: 1750, image: 'assets/image/snacks/cheezels.jpg' },
    { id: 3, name: 'Papa Kryzpo 37g', price: 3000, image: 'assets/image/snacks/PapaKryzpo.jpg' },
    { id: 4, name: 'Tubos Acido Fini', price: 3000, image: 'assets/image/snacks/TubosAcidoFini.jpg' },
    { id: 5, name: 'M&M 48g', price: 3000, image: 'assets/image/snacks/M&M.jpg' },
    { id: 6, name: 'PopCorn Pequeño', price: 7000, image: 'assets/image/snacks/smallpopcorn.jpg' },
    { id: 7, name: 'PopCorn Mediano', price: 10000, image: 'assets/image/snacks/mediumpopcorn.png' },
    { id: 8, name: 'PopCorn Grande', price: 15000, image: 'assets/image/snacks/largepopcorn.jpg' },
    { id: 9, name: 'Bebida Pequeña 400ml', price: 4800, image: 'assets/image/snacks/smalldrink.jpg' },
    { id: 10, name: 'Bebida Mediana 600ml', price: 5900, image: 'assets/image/snacks/mediumdrink.jpg' },
    { id: 11, name: 'Bebida Grande 900ml', price: 6100, image: 'assets/image/snacks/largedrink.jpg' },
    { id: 12, name: 'Agua 500ml ', price: 2000, image: 'assets/image/snacks/awua500.jpg' },
  ];

  showCart = false;

  constructor(private cart: CartService) {}

  addToCart(snack: any) {
    this.cart.addToCart(snack);

  }

  toggleCart() {
    this.showCart = !this.showCart;
  }
}
