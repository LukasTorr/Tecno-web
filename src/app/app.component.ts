import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', 
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Regal Cinemas';
  
  // Eliminamos toda la lógica y propiedades relacionadas con HomeComponent

  constructor(public auth: AuthService, private router: Router) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/home']);
  }
  

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
} 