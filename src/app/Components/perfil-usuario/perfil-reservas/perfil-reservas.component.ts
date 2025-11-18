import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-perfil-reservas',
  templateUrl: './perfil-reservas.component.html',
  styleUrls: ['./perfil-reservas.component.css'],
})
export class PerfilReservasComponent implements OnInit {
  @Input() usuario: Usuario | null = null;
  reservas: any[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    if (this.usuario) {
      this.reservas = [
        {
          id: 1,
          pelicula: 'Dune: Parte 2',
          fecha: '2025-11-10',
          hora: '19:30',
          asientos: ['B5', 'B6'],
        },
        {
          id: 2,
          pelicula: 'Inside Out 2',
          fecha: '2025-11-08',
          hora: '17:00',
          asientos: ['C3', 'C4'],
        },
      ];
    }
  }
}
