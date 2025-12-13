import { Injectable } from '@angular/core';

export interface Session {
    sala: string;
    hora: string;
}

export interface Movie {
    id: number;
    title: string;
    genre: string;
    duration: number;
    image: string;
    sessions: Session[]; 
    estado: 'Activa' | 'Próximamente';
}

@Injectable({ providedIn: 'root' })
export class MovieService {
    private storageKey = 'movies';

    constructor() {
        this.initializeData();
    }

    private initializeData(): void {
        if (!localStorage.getItem(this.storageKey)) {
            // Datos iniciales (Copiados de tu HomeComponent original)
            const initialMovies: Movie[] = [
                { id: 1, title: 'Dune: Parte II', genre: 'Ciencia ficción', duration: 166, image: 'assets/image/dune2.jpg', estado: 'Activa',
                    sessions: [ { sala: 'Sala 1 - IMAX', hora: '19:00' }, { sala: 'Sala 3 - Estándar', hora: '22:00' } ] },
                { id: 2, title: 'Inside Out 2', genre: 'Animación', duration: 95, image: 'assets/image/insideout2.jpg', estado: 'Activa',
                    sessions: [ { sala: 'Sala 2 - VIP', hora: '16:30' }, { sala: 'Sala 2 - VIP', hora: '18:45' } ] },
                { id: 3, title: 'Joker 2', genre: 'Drama', duration: 138, image: 'assets/image/joker2.jpg', estado: 'Próximamente',
                    sessions: [ { sala: 'Sala 1 - IMAX', hora: '21:30' } ] },
            ];
            this.saveMovies(initialMovies);
        }
    }

    private getMovies(): Movie[] {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : [];
    }

    private saveMovies(movies: Movie[]): void {
        localStorage.setItem(this.storageKey, JSON.stringify(movies));
    }
    
    // CRUD: READ
    getMoviesCatalog(): Movie[] {
        return this.getMovies();
    }
    
    // CRUD: CREATE / UPDATE
    saveMovie(movie: Movie): void {
        let movies = this.getMovies();
        
        if (movie.id && movie.id > 0) {
            // UPDATE: Encuentra y reemplaza
            const index = movies.findIndex(m => m.id === movie.id);
            if (index !== -1) {
                movies[index] = movie;
            }
        } else {
            // CREATE: Genera un nuevo ID
            movie.id = new Date().getTime();
            movies.push(movie);
        }
        this.saveMovies(movies);
    }

    // CRUD: DELETE
    deleteMovie(id: number): void {
        let movies = this.getMovies().filter(m => m.id !== id);
        this.saveMovies(movies);
    }
}