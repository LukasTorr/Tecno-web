import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs'; // Asegúrate de que esta línea esté presente

export interface Usuario {
  email: string;
  password: string; // Almacena el hash
  rol: 'admin' | 'cliente';
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private usuarios: Usuario[] = [];
  private readonly saltRounds = 10;
  private readonly defaultPassword = '1234'; 

  constructor(private router: Router) {
    // La carga del array de usuarios (hashes) debe ser lo primero.
    this.cargarUsuarios(); 
  }
  
  // Lógica SÍNCRONA para cargar y auto-reparar el ARRAY DE USUARIOS (almacenado en localStorage)
  private cargarUsuarios(): void {
    // 🚨 Usamos localStorage para el ARRAY COMPLETO DE HASHES (para persistencia entre reinicios)
    const data = localStorage.getItem('usuarios'); 
    let needsSaving = false;

    if (data) {
      this.usuarios = JSON.parse(data);
      
      // Chequeo de contraseñas rotas o sin hashear (auto-reparación)
      this.usuarios = this.usuarios.map((u) => {
          if (!u.password.startsWith('$2b') || u.password === this.defaultPassword) {
              console.warn(`[AuthService] Contraseña de ${u.email} re-hasheada forzosamente.`);
              u.password = bcrypt.hashSync(this.defaultPassword, this.saltRounds); 
              needsSaving = true;
          }
          return u;
      });
      
    } else {
      // CREACIÓN INICIAL
      const adminHash = bcrypt.hashSync(this.defaultPassword, this.saltRounds);
      const clienteHash = bcrypt.hashSync(this.defaultPassword, this.saltRounds);

      this.usuarios = [
        { email: 'admin@cine.com', password: adminHash, rol: 'admin' },
        { email: 'cliente@cine.com', password: clienteHash, rol: 'cliente' }
      ];
      needsSaving = true;
    }
    
    // Solo guardamos si hubo creación o corrección de hashes
    if (needsSaving) {
        this.guardarUsuarios(); // Guarda en localStorage
    }
  }

  // Guarda el array de usuarios (con hashes) en localStorage
  private guardarUsuarios(): void {
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
  }

  // 🔑 LOGIN (SÍNCRONO)
  login(email: string, password: string): boolean {
    this.cargarUsuarios(); 
    
    const usuario = this.usuarios.find(u => u.email === email);
    
    if (usuario) {
      const passwordMatch = bcrypt.compareSync(password, usuario.password); 
      
      if (passwordMatch) {
        // 🚨 CAMBIO CLAVE: Almacenar la sesión activa en sessionStorage
        sessionStorage.setItem('usuario', JSON.stringify(usuario)); 
        return true;
      }
    }
    return false;
  }

  // ✍️ REGISTRO (SÍNCRONO)
  register(email: string, password: string): boolean { 
    const existe = this.usuarios.find(u => u.email === email);
    if (existe) return false;

    const hashedPassword = bcrypt.hashSync(password, this.saltRounds);
    
    const nuevo: Usuario = { email, password: hashedPassword, rol: 'cliente' };
    this.usuarios.push(nuevo);
    this.guardarUsuarios(); // Guarda el array actualizado en localStorage
    return true;
  }
  
  // 🔑 LOGOUT: Eliminar la sesión de sessionStorage
  logout(): void {
    sessionStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  // 🔑 getUsuario: Obtener el usuario de sessionStorage
  getUsuario(): Usuario | null {
    const u = sessionStorage.getItem('usuario');
    return u ? JSON.parse(u) : null;
  }

  getRol(): string | null {
    const u = this.getUsuario();
    return u ? u.rol : null;
  }

  // 🔑 isLogged: Verificar en sessionStorage
  isLogged(): boolean {
    return !!sessionStorage.getItem('usuario');
  }
}