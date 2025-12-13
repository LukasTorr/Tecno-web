// app.component.ts
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
  
  constructor(public auth: AuthService, private router: Router) {}

  logout() {
    this.auth.logout();
    // 🔑 Redirigir a /home, ya que /login no es la página principal
    this.router.navigate(['/home']);
  }
  
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}