// src/app/Components/login/login.component.ts

import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  private validarEmail(email: string): boolean {
    // 🔑 VALIDACIÓN ROBUSTA: Permite login con formatos válidos que terminan en .com
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/i;
    return emailRegex.test(email);
  }

  // 🔑 SÍNCRONO: Función onLogin
  onLogin() {
    this.error = ''; 

    if (!this.validarEmail(this.email)) {
      this.error = 'Por favor, introduce un correo electrónico válido que termine en .com';
      return;
    }
    
    if (!this.password) {
      this.error = 'La contraseña no puede estar vacía.';
      return;
    }

    // Llamada síncrona al servicio
    const success = this.auth.login(this.email, this.password);
    
    if (success) {
      // 🔑 REDIRECCIÓN POST-LOGIN DE LA PÁGINA
      const user = this.auth.getUsuario();
      if (user?.rol === 'admin') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/home']);
      }
    } else {
      this.error = 'Usuario o contraseña incorrectos';
    }
  }
}