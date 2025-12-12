import { Component, OnInit } from '@angular/core';
import { Movie, MovieService, Session } from '../../../services/peliculas/movie.service';

@Component({
  selector: 'app-admin-peliculas',
  templateUrl: './admin-peliculas.component.html',
  styleUrls: ['./admin-peliculas.component.css']
})
export class AdminPeliculasComponent implements OnInit {
  peliculas: Movie[] = [];
  
  showModal: boolean = false;
  currentMovie: Movie | null = null;
  newSessionHora: string = '';
  newSessionSala: string = '';
  
  // Salas de cine disponibles (DEBES CREAR UN SERVICIO DE SALAS REAL LUEGO)
  availableSalas = ['Sala 1 - IMAX', 'Sala 2 - VIP', 'Sala 3 - Estándar'];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadPeliculas();
  }

  loadPeliculas(): void {
    this.peliculas = this.movieService.getMoviesCatalog();
  }

  // --- MODAL Y CRUD FUNCTIONS ---

  openCreateModal(): void {
    // Inicializa una película vacía con ID 0 para "Crear"
    this.currentMovie = { id: 0, title: '', genre: '', duration: 0, image: 'assets/default.jpg', estado: 'Activa', sessions: [] };
    this.showModal = true;
  }

  openEditModal(movie: Movie): void {
    // Usar spread para evitar modificar el objeto original en la tabla antes de guardar
    this.currentMovie = { ...movie }; 
    this.showModal = true;
  }

  saveMovie(): void {
    if (this.currentMovie) {
        this.movieService.saveMovie(this.currentMovie);
        this.loadPeliculas(); // Recargar lista para reflejar cambios
        this.showModal = false;
        this.currentMovie = null;
    }
  }

  deleteMovie(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta película?')) {
        this.movieService.deleteMovie(id);
        this.loadPeliculas();
    }
  }
  
  // --- GESTIÓN DE SESIONES ---

  addSession(): void {
    if (this.currentMovie && this.newSessionHora && this.newSessionSala) {
        const newSession: Session = { sala: this.newSessionSala, hora: this.newSessionHora };
        this.currentMovie.sessions.push(newSession);
        // Limpiar campos después de agregar
        this.newSessionHora = '';
        this.newSessionSala = '';
    }
  }

  removeSession(index: number): void {
    if (this.currentMovie) {
        this.currentMovie.sessions.splice(index, 1);
    }
  }
}