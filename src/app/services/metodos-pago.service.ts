/*import { Injectable } from '@angular/core';
import { MetodoPago } from '../models/metodo-pago.model';
import { Tarjeta } from '../models/tarjeta.model';

@Injectable({
  providedIn: 'root',
})
export class MetodosPagoService {
  obtenerMetodos(email: string): MetodoPago[] {
    const data = localStorage.getItem(`metodos_${email}`);
    return data ? JSON.parse(data) : [];
  }

  agregarMetodo(email: string, tarjeta: Tarjeta): MetodoPago {
    const lista = this.obtenerMetodos(email);

    const metodo: MetodoPago = {
      id: crypto.randomUUID(),
      tipo: tarjeta.detectarTipo(),
      ultima4: tarjeta.numero.slice(-4),
      titular: tarjeta.titular,
      creadoEl: new Date().toISOString(),
      expiracion: tarjeta.expiracion,
    };

    lista.push(metodo);
    localStorage.setItem(`metodos_${email}`, JSON.stringify(lista));

    return metodo;
  }

  eliminarMetodo(email: string, id: string) {
    const lista = this.obtenerMetodos(email).filter((m) => m.id !== id);
    localStorage.setItem(`metodos_${email}`, JSON.stringify(lista));
  }
}*/

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MetodoPago } from '../models/metodo-pago.model';

@Injectable({
  providedIn: 'root',
})
export class MetodosPagoService {
  private storageKey = 'metodosPago_';

  // 👉 Este observable emitirá los cambios
  private metodosPagoSubject = new BehaviorSubject<MetodoPago[]>([]);
  metodosPago$ = this.metodosPagoSubject.asObservable();

  constructor() {}

  cargarMetodos(usuarioEmail: string) {
    const data = localStorage.getItem(this.storageKey + usuarioEmail);
    const metodos: MetodoPago[] = data ? JSON.parse(data) : [];

    // Emitimos los métodos cargados
    this.metodosPagoSubject.next(metodos);
  }

  agregarMetodo(usuarioEmail: string, metodo: MetodoPago) {
    const data = localStorage.getItem(this.storageKey + usuarioEmail);
    const metodos: MetodoPago[] = data ? JSON.parse(data) : [];

    metodos.push(metodo);

    localStorage.setItem(
      this.storageKey + usuarioEmail,
      JSON.stringify(metodos)
    );

    // 👉 Emitimos los métodos actualizados
    this.metodosPagoSubject.next(metodos);
  }

  // 🚀 Eliminar método
  eliminarMetodo(usuarioEmail: string, metodoId: string) {
    const metodos = this.getMetodos(usuarioEmail);

    const filtrados = metodos.filter((m) => m.id !== metodoId);

    localStorage.setItem(
      this.storageKey + usuarioEmail,
      JSON.stringify(filtrados)
    );

    this.metodosPagoSubject.next(filtrados);
  }

  // 🚀 (Opcional) Actualizar método existente
  actualizarMetodo(usuarioEmail: string, metodoActualizado: MetodoPago) {
    const metodos = this.getMetodos(usuarioEmail);

    const nuevos = metodos.map((m) =>
      m.id === metodoActualizado.id ? metodoActualizado : m
    );

    localStorage.setItem(
      this.storageKey + usuarioEmail,
      JSON.stringify(nuevos)
    );

    this.metodosPagoSubject.next(nuevos);
  }

  // 🔧 Obtener métodos del localStorage (uso interno)
  private getMetodos(usuarioEmail: string): MetodoPago[] {
    const data = localStorage.getItem(this.storageKey + usuarioEmail);
    return data ? JSON.parse(data) : [];
  }
}
