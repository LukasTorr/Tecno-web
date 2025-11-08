import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface Usuario {
  email: string;
  password: string;
  rol: 'admin' | 'cliente';
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  // 🔹 Mini "base de datos" local
  private usuarios: Usuario[] = [
    { email: 'admin@cine.com', password: '1234', rol: 'admin' },
    { email: 'cliente@cine.com', password: '1234', rol: 'cliente' },
    { email: 'lukas@cine.com', password: '1234', rol: 'cliente' }
  ];

  constructor(private router: Router) {}

  login(email: string, password: string): boolean {
    const usuario = this.usuarios.find(
      u => u.email === email && u.password === password
    );
    if (usuario) {
      localStorage.setItem('usuario', JSON.stringify(usuario));
      this.router.navigate(['/home']);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  getUsuario(): Usuario | null {
    const u = localStorage.getItem('usuario');
    return u ? JSON.parse(u) : null;
  }

  getRol(): string | null {
    const u = this.getUsuario();
    return u ? u.rol : null;
  }

  isLogged(): boolean {
    return !!localStorage.getItem('usuario');
  }
}
