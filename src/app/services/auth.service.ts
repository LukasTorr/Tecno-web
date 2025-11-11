import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface Usuario {
  email: string;
  password: string;
  rol: 'admin' | 'cliente';
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private usuarios: Usuario[] = [];

  constructor(private router: Router) {
    this.cargarUsuarios();
  }

  private cargarUsuarios(): void {
    const data = localStorage.getItem('usuarios');

    if (data) {
      // 👇 Si ya hay usuarios guardados, los carga del localStorage
      this.usuarios = JSON.parse(data);
    } else {
      // 👇 Si no hay nada, crea los iniciales por defecto
      this.usuarios = [
        { email: 'admin@cine.com', password: '1234', rol: 'admin' },
        { email: 'cliente@cine.com', password: '1234', rol: 'cliente' }
      ];
      localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
    }
  }

  private guardarUsuarios(): void {
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
  }

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

  register(email: string, password: string): boolean {
    const existe = this.usuarios.find(u => u.email === email);
    if (existe) return false;

    const nuevo: Usuario = { email, password, rol: 'cliente' };
    this.usuarios.push(nuevo);
    this.guardarUsuarios(); // 👈 se actualiza localStorage
    return true;
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
