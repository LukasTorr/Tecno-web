import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private usuarios: Usuario[] = [];

  constructor(private router: Router) {
    this.cargarUsuarios();
  }

  private cargarUsuarios(): void {
    const data = localStorage.getItem('usuarios');

    if (data) {
      this.usuarios = JSON.parse(data);
    } else {
      this.usuarios = [
        { id: 1, email: 'admin@cine.com', password: '1234', rol: 'admin' },
        { id: 2, email: 'cliente@cine.com', password: '1234', rol: 'cliente' },
      ];
      this.guardarUsuarios();
    }
  }

  private guardarUsuarios(): void {
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
  }

  login(email: string, password: string): boolean {
    const usuario = this.usuarios.find(
      (u) => u.email === email && u.password === password
    );
    if (usuario) {
      localStorage.setItem('usuario', JSON.stringify(usuario));
      this.router.navigate(['/home']);
      return true;
    }
    return false;
  }

  register(email: string, password: string): boolean {
    const existe = this.usuarios.find((u) => u.email === email);
    if (existe) return false;

    const nuevoId =
      this.usuarios.length > 0
        ? Math.max(...this.usuarios.map((u) => u.id)) + 1
        : 1;

    const nuevo: Usuario = { id: nuevoId, email, password, rol: 'cliente' };
    this.usuarios.push(nuevo);
    this.guardarUsuarios();
    return true;
  }

  actualizarPassword(email: string, nuevaPassword: string) {
    const usuario = this.usuarios.find((u) => u.email === email);
    if (usuario) {
      usuario.password = nuevaPassword;
      this.guardarUsuarios();
    }
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

/*
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
}*/
