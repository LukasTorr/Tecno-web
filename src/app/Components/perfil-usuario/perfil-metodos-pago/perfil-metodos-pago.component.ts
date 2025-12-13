import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-metodos-pago',
  templateUrl: './perfil-metodos-pago.component.html',
  styleUrls: ['./perfil-metodos-pago.component.css'],
})
export class PerfilMetodosPagoComponent implements OnInit {
  usuario: Usuario | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.usuario = this.authService.getUsuario();
  }
}

/** 
export class PerfilMetodosPagoComponent implements OnInit {
  tarjetas: Tarjeta[] = [];
  nuevaTarjeta: Partial<Tarjeta> = {};

  ngOnInit(): void {
    const data = localStorage.getItem('tarjetas');
    this.tarjetas = data ? JSON.parse(data) : [];
  }

  guardarTarjetas() {
    localStorage.setItem('tarjetas', JSON.stringify(this.tarjetas));
  }

  agregarTarjeta() {
    if (!this.nuevaTarjeta.numero || this.nuevaTarjeta.numero.length < 16)
      return;

    const tarjeta: Tarjeta = {
      id: Date.now(),
      numero: this.nuevaTarjeta.numero,
      titular: this.nuevaTarjeta.titular!,
      exp: this.nuevaTarjeta.exp!,
      cvv: this.nuevaTarjeta.cvv!,
      ultimos4: this.nuevaTarjeta.numero.slice(-4),
    };

    this.tarjetas.push(tarjeta);
    this.guardarTarjetas();

    this.nuevaTarjeta = {};
  }

  eliminarTarjeta(id: number) {
    this.tarjetas = this.tarjetas.filter((t) => t.id !== id);
    this.guardarTarjetas();
  }
}
*/
