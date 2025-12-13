// src/app/Components/login/login.component.ts

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'; 
import { Location } from '@angular/common'; // 🔑 Importar Location

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  error = '';
  
  // 🔑 Necesario para simular que el componente funciona como un modal
  // Aunque no usamos showModal, el CSS del overlay necesita esta estructura.

  constructor(
    private auth: AuthService,
    private router: Router,
    private location: Location // 🔑 Inyectar Location
  ) {}
  
  ngOnInit(): void {
      // Opcional: Si ya está logueado, redirigir inmediatamente
      if (this.auth.isLogged()) {
          this.router.navigate(['/home']);
      }
  }

  // 🔑 NUEVO: Cierra el modal y regresa a la página anterior
  closeLoginAndNavigateBack(): void {
      this.location.back();
  }

  private validarEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/i;
    return emailRegex.test(email);
  }

  // 🔑 SÍNCRONO: Función onLogin (se mantiene la lógica de redirección)
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

    const success = this.auth.login(this.email, this.password);
    
    if (success) {
      const user = this.auth.getUsuario();
      
      if (user?.rol === 'Admin') {
        this.router.navigate(['/admin']);
      } else {
        // Redirige a Home si es Cliente
        this.router.navigate(['/home']);
      }
    } else {
      this.error = 'Usuario o contraseña incorrectos';
    }
  }
}