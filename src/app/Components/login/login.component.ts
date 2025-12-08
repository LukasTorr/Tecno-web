import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private auth: AuthService) {}

  private validarEmail(email: string): boolean {
    // Expresión regular para una validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // 🔄 onLogin ahora es asíncrono
  async onLogin() {
    this.error = ''; // Limpiar errores previos

    // 🔑 VALIDACIÓN: Chequear formato de email
    if (!this.validarEmail(this.email)) {
      this.error = 'Por favor, introduce un formato de correo electrónico válido.';
      return;
    }
    
    // 🔑 VALIDACIÓN: Contraseña no vacía
    if (!this.password) {
      this.error = 'La contraseña no puede estar vacía.';
      return;
    }

    // Llama al servicio de login (ahora asíncrono)
    const success = await this.auth.login(this.email, this.password);
    
    if (!success) {
      this.error = 'Usuario o contraseña incorrectos';
    }
  }
}