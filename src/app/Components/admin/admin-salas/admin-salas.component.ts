import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-salas',
  templateUrl: './admin-salas.component.html',
  styleUrls: ['./admin-salas.component.css']
})
export class AdminSalasComponent {
  salas = [
    { id: 301, nombre: 'Sala 1 - IMAX', capacidad: 300, formato: '3D/IMAX' },
    { id: 302, nombre: 'Sala 2 - VIP', capacidad: 80, formato: '2D/VIP' },
    { id: 303, nombre: 'Sala 3 - Estándar', capacidad: 150, formato: '2D' },
  ];
}