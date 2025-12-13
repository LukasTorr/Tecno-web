import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email = '';
  password = '';
  confirm = '';
  error = '';
  success = '';

  constructor(private auth: AuthService, private router: Router) {}

  private validarEmail(email: string): boolean {
    // ✅ CORRECCIÓN FINAL: Expresión regular que exige formato válido y que termina en .com
    // Permite cualquier nombre de dominio antes de .com (ej., proy@cine.com)
    const emailRegex = /^[^\s@]+@[^\s@]+\.com$/i; 
    return emailRegex.test(email);
  }

  async onRegister() {
    this.error = '';
    this.success = '';

    // 1. VALIDACIÓN DE EMAIL
    if (!this.validarEmail(this.email)) {
      this.error = 'Por favor, introduce un correo electrónico válido que termine en .com';
      return;
    }

    // 2. VALIDACIÓN DE CONTRASEÑA
    if (this.password.length < 4) {
        this.error = 'La contraseña debe tener al menos 4 caracteres.';
        return;
    }

    // 3. VALIDACIÓN DE COINCIDENCIA
    if (this.password !== this.confirm) {
      this.error = 'Las contraseñas no coinciden';
      return;
    }

    // 4. REGISTRO (Asíncrono para el cifrado)
    const ok = await this.auth.register(this.email, this.password);
    
    if (!ok) {
      this.error = 'El usuario ya existe';
    } else {
      this.success = 'Cuenta creada correctamente. Ahora puedes iniciar sesión.';
      setTimeout(() => this.router.navigate(['/login']), 1500);
    }
  }
}