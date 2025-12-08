import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs'; // 👈 Importar bcrypt

export interface Usuario {
  email: string;
  password: string; // Ahora será el hash
  rol: 'admin' | 'cliente';
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private usuarios: Usuario[] = [];
  private readonly saltRounds = 10; // Número de rondas de cifrado (estándar)

  constructor(private router: Router) {
    this.cargarUsuarios();
  }

  private async cargarUsuarios(): Promise<void> { // 👈 Hacemos la función asíncrona
    const data = localStorage.getItem('usuarios');
    const defaultPassword = '1234';

    if (data) {
      // Si ya hay usuarios guardados (asumiendo que ya están hasheados)
      this.usuarios = JSON.parse(data);
    } else {
      // 🚨 CREACIÓN INICIAL: Hashear las contraseñas por defecto al inicio
      const adminHash = await bcrypt.hash(defaultPassword, this.saltRounds);
      const clienteHash = await bcrypt.hash(defaultPassword, this.saltRounds);

      this.usuarios = [
        { email: 'admin@cine.com', password: adminHash, rol: 'admin' },
        { email: 'cliente@cine.com', password: clienteHash, rol: 'cliente' }
      ];
      this.guardarUsuarios();
    }
  }

  private guardarUsuarios(): void {
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
  }

  // 🔑 LOGIN: Usamos bcrypt.compare para verificar el hash
  async login(email: string, password: string): Promise<boolean> { // 👈 Hacemos la función asíncrona
    const usuario = this.usuarios.find(u => u.email === email);
    
    if (usuario) {
      // Compara la contraseña ingresada con el hash almacenado
      const passwordMatch = await bcrypt.compare(password, usuario.password);
      
      if (passwordMatch) {
        localStorage.setItem('usuario', JSON.stringify(usuario));
        this.router.navigate(['/home']);
        return true;
      }
    }
    return false;
  }

// ✍️ REGISTRO: Hashear la nueva contraseña antes de guardarla
  async register(email: string, password: string): Promise<boolean> { // 👈 Cambiado a ASÍNCRONO
    const existe = this.usuarios.find(u => u.email === email);
    if (existe) return false;

    // Genera el hash de la contraseña del nuevo usuario
    const hashedPassword = await bcrypt.hash(password, this.saltRounds);
    
    const nuevo: Usuario = { email, password: hashedPassword, rol: 'cliente' };
    this.usuarios.push(nuevo);
    this.guardarUsuarios(); 
    return true;
  }
  
  // ... (logout, getUsuario, getRol, isLogged permanecen iguales)
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