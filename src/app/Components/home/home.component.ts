// src/app/Components/home/home.component.ts

import { Component, OnInit } from '@angular/core'; 
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'; 
// 🔑 CORRECCIÓN CLAVE: Asumiendo que movie.service.ts está en src/app/services/
import { Movie, MovieService } from '../../services/peliculas/movie.service'; 


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = '🎬 Regal Cinemas';

  // Variables de login
  showLoginModal: boolean = false; // <-- Re-añado esta propiedad para que el modal funcione
  loginEmail: string = '';
  loginPassword: string = '';
  loginError: string = '';
  
  // Usar la interfaz Movie importada del servicio
  movies: Movie[] = []; 
  
  // Inyectar MovieService
  constructor(
    public auth: AuthService, 
    private router: Router,
    private movieService: MovieService // 👈 Inyectar MovieService
  ) {}

  ngOnInit(): void {
    this.loadMovies();
  }
  
  loadMovies(): void {
    // Obtener las películas del servicio y filtrar las activas
    this.movies = this.movieService.getMoviesCatalog().filter(m => m.estado === 'Activa');
  }
  
  // --- LÓGICA DEL MODAL Y LOGIN ---

  openLoginModal(): void {
    this.showLoginModal = true;
    this.loginEmail = ''; 
    this.loginPassword = '';
    this.loginError = '';
  }

  closeLoginModal(): void {
    this.showLoginModal = false;
  }
  
  // 🔑 CORRECCIÓN CLAVE: Validación de email robusta
  private validarEmail(email: string): boolean {
    // Permite nombres de usuario y dominios comunes que terminan en .com
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

    // 2. Llamada SÍNCRONA al servicio
    const success = this.auth.login(this.loginEmail, this.loginPassword); 

    if (success) {
      this.closeLoginModal();
      this.loadMovies(); // <--- ACTUALIZA LA LISTA DE PELÍCULAS
      
      // 3. REDIRECCIÓN POST-LOGIN
      const user = this.auth.getUsuario();

      if (user?.rol === 'admin') {
        this.router.navigate(['/admin']);
      } 
      // Si es cliente, la barra de navegación se actualiza y permanece en Home
      
    } else {
      this.loginError = 'Usuario o contraseña incorrectos';
    }
  }
  
  // --- LÓGICA DE NAVEGACIÓN ---
  
  onReservar(movieTitle: string, sala: string, hora: string) {
    if (this.auth.isLogged()) {
      // Si está logueado, navega a la página de reserva
      this.router.navigate(['/reserva'], { queryParams: { movie: movieTitle, sala: sala, hora: hora } });
    } else {
      // Si NO está logueado, muestra el modal de login
      this.openLoginModal();
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/home']); 
  }
}