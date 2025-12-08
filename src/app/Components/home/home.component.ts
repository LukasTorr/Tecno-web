// src/app/Components/home/home.component.ts

import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'; 

// NUEVO: Definición de la interfaz para una Sesión (Sala + Hora)
interface Session {
  sala: string;
  hora: string;
}

// NUEVO: Definición de la interfaz para una Película
interface Movie {
  title: string;
  genre: string;
  duration: number;
  image: string;
  sessions: Session[]; // Lista de sesiones disponibles
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = '🎬 Regal Cinemas';

  // NUEVO: Variables para el modal de Login
  showLoginModal: boolean = false;
  loginEmail = '';
  loginPassword = '';
  loginError = '';
  
  // DATOS MOCK DE PELÍCULAS CON SESIONES
  movies: Movie[] = [
    { 
        title: 'Dune: Parte II', 
        genre: 'Ciencia ficción', 
        duration: 166, 
        image: 'assets/image/dune2.jpg',
        sessions: [
            { sala: 'Sala 1 - IMAX', hora: '19:00' },
            { sala: 'Sala 3 - Estándar', hora: '15:30' },
            { sala: 'Sala 3 - Estándar', hora: '22:00' },
        ]
    },
    { 
        title: 'Inside Out 2', 
        genre: 'Animación', 
        duration: 95, 
        image: 'assets/image/insideout2.jpg',
        sessions: [
            { sala: 'Sala 2 - VIP', hora: '16:30' },
            { sala: 'Sala 2 - VIP', hora: '18:45' },
        ]
    },
    { 
        title: 'Joker 2', 
        genre: 'Drama', 
        duration: 138, 
        image: 'assets/image/joker2.jpg',
        sessions: [
            { sala: 'Sala 1 - IMAX', hora: '21:30' },
            { sala: 'Sala 3 - Estándar', hora: '17:00' },
        ]
    }
    // Puedes añadir más películas aquí
  ];


  // Inyectar Router en el constructor
  constructor(public auth: AuthService, private router: Router) {}

  // MODIFICADO: Ahora recibe la sala y hora para enviarlas a la reserva
  onReservar(movieTitle: string, sala: string, hora: string) {
    if (this.auth.isLogged()) {
      // Si está logueado, navega a la página de reserva
      this.router.navigate(['/reserva'], { 
        queryParams: { 
            movie: movieTitle, 
            sala: sala,   
            hora: hora    
        } 
      });
    } else {
      // Si NO está logueado, muestra el modal de login
      this.openLoginModal();
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/home']); 
  }

  openLoginModal() {
    this.showLoginModal = true;
    this.loginEmail = ''; 
    this.loginPassword = '';
    this.loginError = '';
  }

  closeLoginModal() {
    this.showLoginModal = false;
  }

  // 🔑 CORRECCIÓN CLAVE: Validación de email robusta
  private validarEmail(email: string): boolean {
    // Permite nombres de usuario complejos y dominios que terminan en .com
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/i;
    return emailRegex.test(email);
  }
  
  // SÍNCRONO: Lógica del Login desde el Modal
  handleLoginFromModal() {
    this.loginError = '';

    // 1. VALIDACIÓN
    if (!this.validarEmail(this.loginEmail)) {
        this.loginError = 'Por favor, introduce un correo electrónico válido que termine en .com';
        return;
    }
    
    if (!this.loginPassword) {
        this.loginError = 'La contraseña no puede estar vacía.';
        return;
    }

    // 2. Llamada SÍNCRONA
    const success = this.auth.login(this.loginEmail, this.loginPassword); 

    if (success) {
      this.closeLoginModal();
      
      // 3. REDIRECCIÓN POST-LOGIN DEL MODAL
      const user = this.auth.getUsuario();

      if (user?.rol === 'admin') {
        this.router.navigate(['/admin']);
      } 
      // Si es cliente, cerramos el modal y la vista se refresca.
      
    } else {
      this.loginError = 'Usuario o contraseña incorrectos';
    }
  }
}