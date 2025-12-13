import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-snacks',
  templateUrl: './admin-snacks.component.html',
  styleUrls: ['./admin-snacks.component.css']
})
export class AdminSnacksComponent {
  snacks = [
    { id: 201, nombre: 'PopCorn Grande', precio: 15000, stock: 100 },
    { id: 202, nombre: 'Ramitas Evercrisp', precio: 2690, stock: 50 },
    { id: 203, nombre: 'Bebida Mediana 600ml', precio: 5900, stock: 80 },
  ];
}