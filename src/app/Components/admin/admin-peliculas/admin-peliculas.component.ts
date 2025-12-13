import { Component, OnInit } from '@angular/core';
import { Movie, MovieService, Session } from '../../../services/peliculas/movie.service'; 
// 🔑 NUEVAS IMPORTACIONES
import { Sala, SalasService } from '../../../services/salas/salas.service'; // Importamos la interfaz y el servicio

@Component({
  selector: 'app-admin-peliculas',
  templateUrl: './admin-peliculas.component.html',
  styleUrls: ['./admin-peliculas.component.css']
})
export class AdminPeliculasComponent implements OnInit {
  peliculas: Movie[] = [];
  
  showModal: boolean = false;
  showFileModal: boolean = false;
  
  currentMovie: Movie | null = null;
  newSessionHora: string = '';
  newSessionSala: string = '';
  
  // 🔑 CAMBIO: Ahora es de tipo Sala[] y se llena desde el servicio
  availableSalas: Sala[] = [];

  // Lista de nombres de archivo mockeados en la carpeta assets/image/
  availableFileNames: string[] = [
      'dune2.jpg',
      'insideout2.jpg',
      'joker2.jpg',
      'cartel-avengers-infinity-war.jpg',
      'cartel-han-solo-2.jpg',
      'cartel-jurassic-world-2.jpg',
      'godzilla.jpg',
      'no-way-home.jpg',
      'spider-man-mike-morales.jpg'
  ];

  // 🔑 INYECCIÓN: Inyectamos SalasService además de MovieService
  constructor(
      private movieService: MovieService,
      private salasService: SalasService // Inyectamos el nuevo servicio
  ) {}

  ngOnInit(): void {
    this.loadPeliculas();
    this.loadAvailableSalas(); // 🔑 NUEVA LLAMADA
  }

  loadPeliculas(): void {
    this.peliculas = this.movieService.getMoviesCatalog();
  }

  // 🔑 NUEVA FUNCIÓN: Para cargar las salas disponibles
  loadAvailableSalas(): void {
    this.availableSalas = this.salasService.getSalasList();
  }

  // --- MODAL PRINCIPAL Y CRUD ---

  openCreateModal(): void {
    this.currentMovie = { 
        id: 0, 
        title: '', 
        genre: '', 
        duration: 0, 
        image: 'assets/image/default_poster.jpg',
        estado: 'Activa', 
        sessions: [] 
    };
    this.showModal = true;
  }

  openEditModal(movie: Movie): void {
    this.currentMovie = { ...movie }; 
    this.showModal = true;
  }

  saveMovie(): void {
    if (this.currentMovie) {
        if (!this.currentMovie.title || !this.currentMovie.image) {
            alert('El título y la URL de la imagen son obligatorios.');
            return;
        }

        this.movieService.saveMovie(this.currentMovie);
        this.loadPeliculas(); 
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
    if (!this.newSessionHora || !this.newSessionSala) {
        alert('Debes seleccionar sala y hora para agregar una sesión.');
        return;
    }
    
    if (this.currentMovie) {
        const newSession: Session = { sala: this.newSessionSala, hora: this.newSessionHora };
        
        if (!this.currentMovie.sessions) {
            this.currentMovie.sessions = [];
        }
        
        this.currentMovie.sessions.push(newSession);
        this.newSessionHora = '';
        this.newSessionSala = '';
    }
  }

  removeSession(index: number): void {
    if (this.currentMovie) {
        this.currentMovie.sessions.splice(index, 1);
    }
  }

  // 🔑 LÓGICA DEL MODAL DE ARCHIVOS (Sin cambios)

  openFileModal(): void {
    this.showFileModal = true;
  }

  selectFileName(fileName: string): void {
    if (this.currentMovie) {
        this.currentMovie.image = `assets/image/${fileName}`;
    }
    this.showFileModal = false;
  }
}