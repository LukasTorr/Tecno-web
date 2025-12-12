import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Asiento {
  fila: number;
  columna: number;
  ocupado: boolean;
  seleccionado: boolean;
}

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {

  tituloPelicula: string = '';
  filas = 8;
  columnas = 10;
  asientos: Asiento[][] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Obtener el nombre de la película desde los parámetros
    this.route.queryParams.subscribe(params => {
      this.tituloPelicula = params['movie'] || 'Película desconocida';
      this.generarAsientos();
      this.cargarReservas();
    });
  }

  generarAsientos(): void {
    this.asientos = [];
    for (let f = 0; f < this.filas; f++) {
      const fila: Asiento[] = [];
      for (let c = 0; c < this.columnas; c++) {
        fila.push({
          fila: f,
          columna: c,
          ocupado: false,
          seleccionado: false
        });
      }
      this.asientos.push(fila);
    }
  }

  seleccionarAsiento(asiento: Asiento): void {
    if (asiento.ocupado) return;
    asiento.seleccionado = !asiento.seleccionado;
  }

  reservar(): void {
    // Obtener los asientos seleccionados
    const seleccionados = this.asientos.flat().filter(a => a.seleccionado);
    if (seleccionados.length === 0) {
      alert('Selecciona al menos un asiento antes de reservar.');
      return;
    }

    // Cargar reservas anteriores desde localStorage
    const reservas = this.obtenerReservas();

    // Agregar los nuevos asientos como ocupados
    seleccionados.forEach(a => {
      reservas.push({
        movie: this.tituloPelicula,
        fila: a.fila,
        columna: a.columna
      });
    });

    // Guardar en localStorage
    localStorage.setItem('reservas', JSON.stringify(reservas));

    // Marcar los asientos como ocupados
    seleccionados.forEach(a => (a.ocupado = true));
    alert(`Reservaste ${seleccionados.length} asiento(s) para "${this.tituloPelicula}".`);
  }

  obtenerReservas(): any[] {
    return JSON.parse(localStorage.getItem('reservas') || '[]');
  }

  cargarReservas(): void {
    const reservas = this.obtenerReservas();
    const reservasPelicula = reservas.filter(r => r.movie === this.tituloPelicula);

    // Marcar como ocupados los asientos previamente reservados
    reservasPelicula.forEach(r => {
      if (this.asientos[r.fila] && this.asientos[r.fila][r.columna]) {
        this.asientos[r.fila][r.columna].ocupado = true;
      }
    });
  }

}
