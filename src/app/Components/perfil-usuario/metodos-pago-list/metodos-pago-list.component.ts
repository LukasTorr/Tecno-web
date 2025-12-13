/*import { Component, Input, OnInit } from '@angular/core';
import { MetodosPagoService } from '../../../services/metodos-pago.service';
import { MetodoPago } from '../../../models/metodo-pago.model';

@Component({
  selector: 'app-metodos-pago-list',
  templateUrl: './metodos-pago-list.component.html',
})
export class MetodosPagoListComponent implements OnInit {
  @Input() usuarioEmail!: string;
  metodos: MetodoPago[] = [];

  constructor(private metodosPagoService: MetodosPagoService) {}

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    if (!this.usuarioEmail) return;
    this.metodos = this.metodosPagoService.obtenerMetodos(this.usuarioEmail);
  }

  eliminar(id: string) {
    this.metodosPagoService.eliminarMetodo(this.usuarioEmail, id);
    this.metodos = this.metodos.filter((m) => m.id !== id);
  }
}
*/

import { Component, Input, OnInit } from '@angular/core';
import { MetodosPagoService } from '../../../services/metodos-pago.service';
import { MetodoPago } from '../../../models/metodo-pago.model';

@Component({
  selector: 'app-metodos-pago-list',
  templateUrl: './metodos-pago-list.component.html',
})
export class MetodosPagoListComponent implements OnInit {
  @Input() usuarioEmail!: string; // ya no acepta null
  metodos: MetodoPago[] = [];

  constructor(private metodosPagoService: MetodosPagoService) {}

  ngOnInit(): void {
    this.cargarMetodos();
  }

  cargarMetodos() {
    // Cargar métodos desde localStorage
    this.metodosPagoService.cargarMetodos(this.usuarioEmail);

    // Escuchar cambios en tiempo real
    this.metodosPagoService.metodosPago$.subscribe((m) => {
      this.metodos = m;
    });
  }

  eliminar(id: string) {
    if (!confirm('¿Eliminar este método de pago?')) return;

    this.metodosPagoService.eliminarMetodo(this.usuarioEmail, id);

    // Actualizar la lista en pantalla
    this.cargarMetodos();
  }
}
