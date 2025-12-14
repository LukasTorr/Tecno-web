import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
// 🔑 Importar el modelo User (solo para tipado)
import { User } from 'src/app/services/user/user.service'; 
// 🔑 Importar el nuevo servicio de reservas
import { ReservationService, Reservation } from 'src/app/services/reserva/reservation.service'; 

@Component({
  selector: 'app-perfil-reservas',
  templateUrl: './perfil-reservas.component.html',
  styleUrls: ['./perfil-reservas.component.css'],
})
export class PerfilReservasComponent implements OnInit {
  
  @Input() usuario: User | null = null;
  // 🔑 Cambiar el tipo a Reservation[]
  reservas: Reservation[] = []; 

  // 🔑 Inyectar el ReservationService
  constructor(
      private authService: AuthService, 
      private reservationService: ReservationService 
  ) {}

  ngOnInit(): void {
    // 🔑 CORRECCIÓN: Si el usuario está disponible, cargar sus reservas reales
    if (this.usuario && this.usuario.email) {
        this.reservas = this.reservationService.getReservationsByUser(this.usuario.email);
    }
    
    // Nota: El Input @Input() usuario debe ser pasado por PerfilUsuarioComponent
    // Si la carga del usuario en PerfilUsuarioComponent no se ha completado,
    // puedes usar el email de la sesión directamente si falla el Input.
    const session = this.authService.getUsuario();
    if (session && this.reservas.length === 0) {
        this.reservas = this.reservationService.getReservationsByUser(session.email);
    }
  }
}