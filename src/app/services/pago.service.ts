import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PagoService {
  pagar(email: string, token: string, monto: number): boolean {
    console.log(
      `Simulación: cobrando $${monto} al método ${token} del usuario ${email}`
    );
    return true;
  }
}
