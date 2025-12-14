// src/app/Components/reserva/reserva.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { Location } from '@angular/common'; 

// 🔑 Servicios necesarios
import { SalasService, Sala } from '../../services/salas/salas.service'; 
import { AuthService } from '../../services/auth.service'; 
import { ReservationService, Reservation } from '../../services/reserva/reservation.service'; 

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
  
  private precioTicketBase = 0; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private salasService: SalasService,
    private authService: AuthService,
    private reservationService: ReservationService 
  ) {}

  ngOnInit(): void {
    
    this.salasDisponibles = this.salasService.getSalasList(); 
    
    this.route.queryParams.subscribe(params => {
      this.tituloPelicula = params['movie'] || 'Película desconocida';
      this.salaActual = params['sala'] || 'Sala desconocida'; 
      this.horaActual = params['hora'] || 'Hora no especificada'; 
      
      this.establecerPrecioBase(this.salaActual);
      
      this.generarAsientosCondicionales(this.salaActual);
      this.cargarReservas();
    });
  }
  
  establecerPrecioBase(nombreSala: string): void {
      const salaConfig = this.salasDisponibles.find(s => s.nombre === nombreSala);
      // Asigna el precio o usa 5000 CLP como respaldo si no se encuentra
      this.precioTicketBase = salaConfig ? salaConfig.precioBase : 5000; 
  }

  generarAsientosCondicionales(nombreSala: string): void {
    const salaConfiguracion = this.salasDisponibles.find(
        sala => sala.nombre === nombreSala
    );
    
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
  }

  reservar(): void {
    
    const usuario = this.authService.getUsuario();
    if (!usuario) {
        alert('Error: Debes estar logueado para completar la reserva.');
        return;
    }
    
    const seleccionados = this.asientos.flat().filter(a => a.seleccionado);
    if (seleccionados.length === 0) {
      alert('Selecciona al menos un asiento antes de reservar.');
      return;
    }

    const listaAsientos = seleccionados.map(a => 
        `Fila ${String.fromCharCode(65 + a.fila)}, Columna ${a.columna + 1}`
    );
    
    const totalPagar = seleccionados.length * this.precioTicketBase;

    const nuevaReserva: Reservation = {
        id: 0,
        userEmail: usuario.email,
        pelicula: this.tituloPelicula,
        sala: this.salaActual,
        fecha: new Date().toISOString().split('T')[0],
        hora: this.horaActual,
        asientos: listaAsientos,
        totalSnacks: 0, 
        totalPagar: totalPagar // 🔑 ESTE VALOR ES CLAVE Y SE ESTÁ CALCULANDO CORRECTAMENTE
    };

    this.reservationService.saveReservation(nuevaReserva);
    
    seleccionados.forEach(a => {
        a.ocupado = true;
        a.seleccionado = false;
    });
    
    // MENSAJE DE CONFIRMACIÓN
    const formatoCLP = totalPagar.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 });
    alert(`Reservaste ${seleccionados.length} asiento(s) para "${this.tituloPelicula}" en la Sala: ${this.salaActual} a las ${this.horaActual}. Total: ${formatoCLP}. ¡Ticket generado!`);
    
    this.cargarReservas(); 
  }

  cargarReservas(): void {
    this.asientos.flat().forEach(a => {
      a.ocupado = false;
      a.seleccionado = false;
    });
      
    const reservasPelicula = this.reservationService.getAllReservations()
        .filter(r => 
            r.pelicula === this.tituloPelicula && 
            r.sala === this.salaActual &&
            r.hora === this.horaActual 
        );

    reservasPelicula.forEach(r => {
        r.asientos.forEach(asientoStr => {
            const parts = asientoStr.match(/Fila ([A-Z]), Columna (\d+)/);
            if (parts) {
                const filaIndex = parts[1].charCodeAt(0) - 65; 
                const columnaIndex = parseInt(parts[2]) - 1;   
                
                if (filaIndex >= 0 && filaIndex < this.filas && columnaIndex >= 0 && columnaIndex < this.columnas) {
                    this.asientos[filaIndex][columnaIndex].ocupado = true;
                }
            }
        });
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