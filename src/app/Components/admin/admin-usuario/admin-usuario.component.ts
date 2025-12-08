import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuario.component.html',
  styleUrls: ['./admin-usuario.component.css']
})
export class AdminUsuariosComponent {
  usuarios = [
    { id: 1, email: 'admin@cine.com', rol: 'Admin', fechaRegistro: '2023-01-01' },
    { id: 2, email: 'cliente@cine.com', rol: 'Cliente', fechaRegistro: '2023-01-15' },
    { id: 3, email: 'nuevo@cliente.com', rol: 'Cliente', fechaRegistro: '2024-05-20' },
  ];
}