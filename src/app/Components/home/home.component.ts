import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

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

  constructor(public auth: AuthService) {}

  logout() {
    this.auth.logout();
  }
}
