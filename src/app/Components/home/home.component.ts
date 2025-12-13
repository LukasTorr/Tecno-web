// src/app/Components/home/home.component.ts

import { Component, OnInit } from '@angular/core'; 
import { AuthService } from '../../services/auth.service';
// 🔑 Importar Router y ActivatedRoute
import { Router, ActivatedRoute } from '@angular/router'; 
// 🔑 CORRECCIÓN: Ajustar la ruta de importación del servicio de películas
import { Movie, MovieService } from '../../services/peliculas/movie.service'; 


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  // 🔑 Propiedades necesarias para la lógica de login, aunque ya no se usen para el modal
  showLoginModal: boolean = false; 
  loginError: string = '';
  
  movies: Movie[] = []; 
  

  constructor(
    public auth: AuthService, 
    private router: Router,
    // 🔑 Inyectar ActivatedRoute para leer parámetros
    private route: ActivatedRoute,
    private movieService: MovieService,
  ) {}

  ngOnInit(): void {
    this.loadMovies();
    this.checkIfModalShouldOpen(); // 🔑 Llamamos a la función que revisa la URL
  }
  
  loadMovies(): void {
    this.movies = this.movieService.getMoviesCatalog();
  }
  
  // 🔑 NUEVO MÉTODO: Dispara el modal de login si la URL lo indica
  checkIfModalShouldOpen(): void {
    this.route.queryParams.subscribe(params => {
      // 1. Si el parámetro 'openLogin' existe (vino del header)
      if (params['openLogin'] === 'true') {
        
        // 2. Establecemos el estado local para que el Login Component sepa que fue llamado por el header
        // Aunque la redirección se encarga de esto, mantenemos la limpieza de la URL:
        
        // 3. Limpiar el query parameter para que no se reabra al refrescar
        this.router.navigate([], {
          queryParams: { openLogin: null },
          queryParamsHandling: 'merge' 
        });
        
        // NOTA: Con la nueva estructura, el login se abre automáticamente al ir a /login.
        // Solo necesitamos asegurar que el botón de reservar redirija correctamente.
      }
    });
  }

  // Se mantiene solo la redirección a /login
  onReservar(movieTitle: string, sala: string, hora: string) {
    if (this.auth.isLogged()) {
      this.router.navigate(['/reserva'], { queryParams: { movie: movieTitle, sala: sala, hora: hora } });
    } else {
      // 🔑 Redirigir a /login
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/home']); 
  }
}