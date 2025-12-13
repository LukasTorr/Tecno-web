import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'; // 👈 Importar Router

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  // Es buena práctica añadir el styleUrls si existe un admin.component.css
  // styleUrls: ['./admin.component.css'] 
})
export class AdminComponent {
  // 👈 Inyectar Router
  constructor(public auth: AuthService, private router: Router) {}

  logout() {
    this.auth.logout();
    // Redirigir después de cerrar sesión, aunque el AuthService ya lo hace
    this.router.navigate(['/login']); 
  }
}