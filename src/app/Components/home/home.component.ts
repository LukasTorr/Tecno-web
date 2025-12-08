// home.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'; // 👈 ¡IMPORTANTE: Añade esta importación!

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = '🎬 Regal Cinemas';

  movies = [
    { title: 'Dune: Parte II', genre: 'Ciencia ficción', duration: 166, image: 'assets/image/dune2.jpg' },
    { title: 'Inside Out 2', genre: 'Animación', duration: 95, image: 'assets/image/insideout2.jpg' },
    { title: 'Joker 2', genre: 'Drama', duration: 138, image: 'assets/image/joker2.jpg' }
  ];

  // NUEVO: Variables para el modal de Login
  showLoginModal: boolean = false;
  loginEmail = '';
  loginPassword = '';
  loginError = '';

  // Inyectar Router en el constructor
  constructor(public auth: AuthService, private router: Router) {}

  // NUEVO: Lógica del botón Reservar
  onReservar(movieTitle: string) {
    if (this.auth.isLogged()) {
      // Si está logueado, navega a la página de reserva
      this.router.navigate(['/reserva'], { queryParams: { movie: movieTitle } });
    } else {
      // Si NO está logueado, muestra el modal de login
      this.openLoginModal();
    }
  }

  // Lógica de cerrar sesión (actualizada para navegar al home)
  logout() {
    this.auth.logout();
    this.router.navigate(['/home']); 
  }

  // Lógica del Modal
  openLoginModal() {
    this.showLoginModal = true;
    this.loginEmail = ''; 
    this.loginPassword = '';
    this.loginError = '';
  }

  closeLoginModal() {
    this.showLoginModal = false;
  }

  private validarEmail(email: string): boolean {
    // Reutilizar la validación de .com
    const emailRegex = /^[^\s@]+@[^\s@]+\.com$/i;
    return emailRegex.test(email);
  }
  
  // NUEVO: Lógica de Login dentro del Modal
  async handleLoginFromModal() {
    this.loginError = '';

    if (!this.validarEmail(this.loginEmail)) {
        this.loginError = 'Por favor, introduce un correo electrónico válido que termine en .com';
        return;
    }
    
    if (!this.loginPassword) {
        this.loginError = 'La contraseña no puede estar vacía.';
        return;
    }

    // El login ahora es asíncrono gracias a los cambios anteriores con bcrypt
    const success = await this.auth.login(this.loginEmail, this.loginPassword);

    if (success) {
      this.closeLoginModal(); // Cierra el modal al iniciar sesión
      // El AuthService se encarga de navegar a /home
    } else {
      this.loginError = 'Usuario o contraseña incorrectos';
    }
  }
}