import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-peliculas',
  templateUrl: './admin-peliculas.component.html',
  styleUrls: ['./admin-peliculas.component.css']
})
export class AdminPeliculasComponent {
  peliculas = [
    { id: 101, titulo: 'Dune: Parte II', genero: 'Ciencia ficción', duracion: 166, estado: 'Activa' },
    { id: 102, titulo: 'Inside Out 2', genero: 'Animación', duracion: 95, estado: 'Activa' },
    { id: 103, titulo: 'Joker 2', genero: 'Drama', duracion: 138, estado: 'Próximamente' },
  ];
}