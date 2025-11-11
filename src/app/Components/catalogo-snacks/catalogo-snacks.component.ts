import { Component } from '@angular/core';
import { CartService } from '../../services/CarritoCompra/cart.service';

@Component({
  selector: 'app-catalogo-snacks',
  templateUrl: './catalogo-snacks.component.html',
  styleUrls: ['./catalogo-snacks.component.css']
})
export class CatalogoSnacksComponent {
  snacks = [
    { name: 'Ramitas Evercrisp', price: 2690, image: 'assets/image/snacks/ramitas.jpg' },
    { name: 'Cheezels 200g', price: 1750, image: 'assets/image/snacks/cheezels.jpg' },
    { name: 'Papa Kryzpo 37g', price: 3000, image: 'assets/image/snacks/PapaKryzpo.jpg' },
    { name: 'Tubos Acido Fini', price: 3000, image: 'assets/image/snacks/TubosAcidoFini.jpg' },
    { name: 'M&M 48g', price: 3000, image: 'assets/image/snacks/M&M.jpg' },
    { name: 'PopCorn Pequeño', price: 7000, image: 'assets/image/snacks/smallpopcorn.jpg' },
    { name: 'PopCorn Mediano', price: 10000, image: 'assets/image/snacks/mediumpopcorn.png' },
    { name: 'PopCorn Grande', price: 15000, image: 'assets/image/snacks/largepopcorn.jpg' },
    { name: 'Bebida Pequeña 400ml', price: 4800, image: 'assets/image/snacks/smalldrink.jpg' },
    { name: 'Bebida Mediana 600ml', price: 5900, image: 'assets/image/snacks/mediumdrink.jpg' },
    { name: 'Bebida Grande 900ml', price: 6100, image: 'assets/image/snacks/largedrink.jpg' },
    { name: 'Agua 500ml ', price: 2000, image: 'assets/image/snacks/awua500.jpg' },
    { name: '', price: 0, image: 'assets/image/snacks/.jpg' },


    
    // ...
  ];

  showCart = false;

  constructor(private cart: CartService) {}

  addToCart(snack: any) {
    this.cart.addToCart(snack);
    this.showCart = true; // se abre el carrito al agregar algo
  }

  toggleCart() {
    this.showCart = !this.showCart;
  }
}
