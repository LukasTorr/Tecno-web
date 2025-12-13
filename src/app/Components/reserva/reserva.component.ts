// src/app/Components/reserva/reserva.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { Location } from '@angular/common'; 
// 🔑 VERIFICAR RUTA: Asumiendo que el servicio está en src/app/services/
// ReservaComponent está en src/app/Components/reserva/
import { SalasService, Sala } from '../../services/salas/salas.service'; 


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
  salaActual: string = ''; 
  horaActual: string = ''; 

  filas = 0; 
  columnas = 0;
  asientos: Asiento[][] = [];
  
  private salasDisponibles: Sala[] = []; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    // 🔑 INYECTAR EL SERVICIO DE SALAS
    private salasService: SalasService 
  ) {}

  ngOnInit(): void {
    
    // 1. Cargar las salas ANTES de procesar los queryParams
    this.salasDisponibles = this.salasService.getSalasList(); 
    
    this.route.queryParams.subscribe(params => {
      this.tituloPelicula = params['movie'] || 'Película desconocida';
      this.salaActual = params['sala'] || 'Sala desconocida'; 
      this.horaActual = params['hora'] || 'Hora no especificada'; 
      
      // 2. Generar asientos usando la capacidad DINÁMICA
      this.generarAsientosCondicionales(this.salaActual);
      this.cargarReservas();
    });
  }

  // 🔑 MODIFICADO: Genera asientos buscando la capacidad en el array de salas
  generarAsientosCondicionales(nombreSala: string): void {
    
    // Buscar la sala configurada por el administrador (la clave de búsqueda es el nombre)
    const salaConfiguracion = this.salasDisponibles.find(
        sala => sala.nombre === nombreSala
    );
    
    // 🔑 LOGICA DE FALLBACK Y ASIGNACIÓN
    // Usar la configuración encontrada o un valor seguro por defecto (8x12)
    const filas = salaConfiguracion ? salaConfiguracion.filas : 8;
    const columnas = salaConfiguracion ? salaConfiguracion.columnas : 12;

    this.filas = filas;
    this.columnas = columnas;
    
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
    
    // 💡 IMPORTANTE: Si la sala no se encuentra, es probable que no se haya inicializado 
    // correctamente en el panel de administración o el SalasService.
    if (!salaConfiguracion) {
        console.warn(`[ReservaComponent] Sala "${nombreSala}" no encontrada en el servicio. Usando 8x12 por defecto.`);
    }
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
        columna: a.columna,
        sala: this.salaActual, 
        hora: this.horaActual  
      });
    });

    localStorage.setItem('reservas', JSON.stringify(reservas));
    
    seleccionados.forEach(a => (a.ocupado = true));
    alert(`Reservaste ${seleccionados.length} asiento(s) para "${this.tituloPelicula}" en la Sala: ${this.salaActual} a las ${this.horaActual}.`);
    
    this.cargarReservas(); 
  }

  obtenerReservas(): any[] {
    return JSON.parse(localStorage.getItem('reservas') || '[]');
  }
 
  cargarReservas(): void {
    // Primero, reinicializar el estado de la reserva
    this.asientos.flat().forEach(a => {
      a.ocupado = false;
      a.seleccionado = false;
    });
      
    const reservas = this.obtenerReservas();
    const reservasPelicula = reservas.filter(
        r => r.movie === this.tituloPelicula && r.sala === this.salaActual 
    );

    reservasPelicula.forEach(r => {
      // Asegurar que las coordenadas existan antes de marcar
      if (r.fila < this.filas && r.columna < this.columnas) { 
        this.asientos[r.fila][r.columna].ocupado = true;
      }
    });
  }

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