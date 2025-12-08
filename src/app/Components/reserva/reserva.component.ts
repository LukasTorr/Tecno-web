import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // 👈 Importar Router
import { Location } from '@angular/common'; // 👈 Importar Location

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

  // Inyectar Location y Router en el constructor
  constructor(
    private route: ActivatedRoute,
    private router: Router, // 👈 Inyección del Router
    private location: Location // 👈 Inyección del Location
  ) {}

  ngOnInit(): void {
    
    this.route.queryParams.subscribe(params => {
      this.tituloPelicula = params['movie'] || 'Película desconocida';
      this.generarAsientos();
      this.cargarReservas();
    });
  }
  // ... (generarAsientos, seleccionarAsiento, reservar, obtenerReservas, cargarReservas sin cambios)

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
    
    const seleccionados = this.asientos.flat().filter(a => a.seleccionado);
    if (seleccionados.length === 0) {
      alert('Selecciona al menos un asiento antes de reservar.');
      return;
    }

    
    const reservas = this.obtenerReservas();

    
    seleccionados.forEach(a => {
      reservas.push({
        movie: this.tituloPelicula,
        fila: a.fila,
        columna: a.columna
      });
    });

    
    localStorage.setItem('reservas', JSON.stringify(reservas));

    
    seleccionados.forEach(a => (a.ocupado = true));
    alert(`Reservaste ${seleccionados.length} asiento(s) para "${this.tituloPelicula}".`);
  }

  obtenerReservas(): any[] {
    return JSON.parse(localStorage.getItem('reservas') || '[]');
  }
 
  cargarReservas(): void {
    const reservas = this.obtenerReservas();
    const reservasPelicula = reservas.filter(r => r.movie === this.tituloPelicula);


    reservasPelicula.forEach(r => {
      if (this.asientos[r.fila] && this.asientos[r.fila][r.columna]) {
        this.asientos[r.fila][r.columna].ocupado = true;
      }
    });
  }

  // 👇 NUEVOS MÉTODOS DE NAVEGACIÓN

  // Navega a la página de snacks (asumiendo que la ruta es '/snacks' como resolvimos en el merge)
  irAComprarSnacks(): void {
    this.router.navigate(['/snacks']);
  }

  // Vuelve a la URL anterior en el historial del navegador
  volverAtras(): void {
    this.location.back();
  }
}