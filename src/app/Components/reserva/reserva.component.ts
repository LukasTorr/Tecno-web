// src/app/Components/reserva/reserva.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { Location } from '@angular/common'; 

// ... (Interfaces Asiento, SalaCapacidad, SalaMapping) ...

interface Asiento {
  fila: number;
  columna: number;
  ocupado: boolean;
  seleccionado: boolean;
}

interface SalaCapacidad {
    filas: number;
    columnas: number;
}

interface SalaMapping {
    [key: string]: SalaCapacidad;
}

const CAPACIDADES_SALA: SalaMapping = {
  'Sala 1 - IMAX': { filas: 10, columnas: 15 }, 
  'Sala 2 - VIP': { filas: 5, columnas: 10 },   
  'Sala 3 - Estándar': { filas: 8, columnas: 12 }, 
};

// Ya no necesitamos SESIONES_MOCK aquí porque los datos vienen del home
// const SESIONES_MOCK = [...] 


@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {

  tituloPelicula: string = '';
  // Propiedades para la sala y hora seleccionadas
  salaActual: string = ''; 
  horaActual: string = ''; 

  filas = 0; 
  columnas = 0;
  asientos: Asiento[][] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    
    this.route.queryParams.subscribe(params => {
      this.tituloPelicula = params['movie'] || 'Película desconocida';
      // CAPTURAR sala y hora DE LOS queryParams
      this.salaActual = params['sala'] || 'Sala 3 - Estándar'; 
      this.horaActual = params['hora'] || 'Hora no especificada'; 
      
      this.generarAsientosCondicionales(this.salaActual);
      this.cargarReservas();
    });
  }

  // Se mantiene igual al paso anterior
  generarAsientosCondicionales(nombreSala: string): void {
    
    let capacidad: SalaCapacidad;

    if (nombreSala in CAPACIDADES_SALA) {
      // @ts-ignore: TypeScript lo entiende si usamos 'in'
      capacidad = CAPACIDADES_SALA[nombreSala]; 
    } else {
      capacidad = CAPACIDADES_SALA['Sala 3 - Estándar']; 
    }
    
    this.filas = capacidad.filas;
    this.columnas = capacidad.columnas;
    
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

  // MODIFICADO: Guarda la sala y hora en la reserva
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
        columna: a.columna,
        sala: this.salaActual, // AÑADIDO
        hora: this.horaActual  // AÑADIDO
      });
    });

    
    localStorage.setItem('reservas', JSON.stringify(reservas));

    
    seleccionados.forEach(a => (a.ocupado = true));
    alert(`Reservaste ${seleccionados.length} asiento(s) para "${this.tituloPelicula}" en la Sala: ${this.salaActual} a las ${this.horaActual}.`);
  }

  obtenerReservas(): any[] {
    return JSON.parse(localStorage.getItem('reservas') || '[]');
  }
 
  // MODIFICADO: Filtra por movie Y sala
  cargarReservas(): void {
    const reservas = this.obtenerReservas();
    const reservasPelicula = reservas.filter(
        // El filtro ahora considera la sala para cargar las reservas correctas
        r => r.movie === this.tituloPelicula && r.sala === this.salaActual 
    );

    reservasPelicula.forEach(r => {
      if (this.asientos[r.fila] && this.asientos[r.fila][r.columna]) {
        this.asientos[r.fila][r.columna].ocupado = true;
      }
    });
  }

  // ... (otros métodos como seleccionarAsiento, irAComprarSnacks, volverAtras)
  seleccionarAsiento(asiento: Asiento): void {
    if (asiento.ocupado) return;
    asiento.seleccionado = !asiento.seleccionado;
  }
  
  irAComprarSnacks(): void {
    this.router.navigate(['/snacks']);
  }

  volverAtras(): void {
    this.location.back();
  }
}