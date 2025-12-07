import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MetodosPagoService } from '../../../services/metodos-pago.service';
import { MetodoPago } from '../../../models/metodo-pago.model';

@Component({
  selector: 'app-metodo-pago-form',
  templateUrl: './metodo-pago-form.component.html',
  styleUrls: ['./metodo-pago-form.component.css'],
})
export class MetodoPagoFormComponent {
  @Input() usuarioEmail!: string;

  numero = '';
  titular = '';
  expiracion = '';
  cvv = '';
  tipo = 'desconocida';

  icono: string = 'assets/cards/generic-card.png';

  constructor(private metodosPagoService: MetodosPagoService) {}

  detectarTipoTarjeta(numero: string): { tipo: string; icono: string } {
    const n = numero.replace(/\s+/g, ''); // eliminamos espacios

    // VISA
    if (/^4[0-9]{12}(?:[0-9]{3})?$/.test(n)) {
      return { tipo: 'VISA', icono: 'assets/cards/visa.png' };
    }

    // MASTERCARD (51–55 o 2221–2720)
    if (
      /^(5[1-5][0-9]{14}|2(2[2-9][0-9]{12}|[3-6][0-9]{13}|7[01][0-9]{12}|720[0-9]{12}))$/.test(
        n
      )
    ) {
      return { tipo: 'MasterCard', icono: 'assets/cards/mastercard.png' };
    }

    // AMERICAN EXPRESS (34 o 37, 15 dígitos)
    if (/^3[47][0-9]{13}$/.test(n)) {
      return { tipo: 'American Express', icono: 'assets/cards/amex.png' };
    }

    // GENERIC
    return { tipo: 'Tarjeta', icono: 'assets/cards/generic-card.png' };
  }

  guardar(form: NgForm) {
    if (form.invalid || !this.usuarioEmail) return;

    const { tipo, icono } = this.detectarTipoTarjeta(this.numero);
    const metodo: MetodoPago = {
      id: crypto.randomUUID(),
      tipo: tipo,
      ultima4: this.numero.slice(-4),
      titular: this.titular,
      creadoEl: new Date().toISOString(),
      expiracion: this.expiracion,
      icono: icono,
    };

    this.metodosPagoService.agregarMetodo(this.usuarioEmail, metodo);
    form.resetForm();

    alert('Método de pago agregado');
  }

  onNumeroTarjetaChange() {
    const result = this.detectarTipoTarjeta(this.numero);
    this.icono = result.icono;
    this.tipo = result.tipo;
  }
}
