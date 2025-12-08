import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs';

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
    // Llamada SÍNCRONA directa en el constructor
    this.cargarUsuarios(); 
  }
  
  // Lógica SÍNCRONA y robusta para cargar usuarios y re-hashear
  private cargarUsuarios(): void {
    const data = localStorage.getItem('usuarios');
    let needsSaving = false;

    if (data) {
      this.usuarios = JSON.parse(data);
      
      // 🚨 CORRECCIÓN FINAL: Chequea si la contraseña es sospechosa (no es hash)
      this.usuarios = this.usuarios.map((u) => {
          // Si el password NO empieza con $2b (formato bcrypt) O es igual a la contraseña por defecto (1234)
          if (!u.password.startsWith('$2b') || u.password === this.defaultPassword) {
              console.warn(`[AuthService] Contraseña de ${u.email} re-hasheada forzosamente.`);
              u.password = bcrypt.hashSync(this.defaultPassword, this.saltRounds); 
              needsSaving = true;
          }
          return u;
      });
      
    } else {
      // 🚀 CREACIÓN INICIAL (Solo si localStorage está vacío)
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
        this.guardarUsuarios();
    }
  }

  private guardarUsuarios(): void {
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
  }

  // 🔑 LOGIN (SÍNCRONO)
  login(email: string, password: string): boolean {
    this.cargarUsuarios(); // Medida de seguridad: asegura que los datos estén frescos
    
    const usuario = this.usuarios.find(u => u.email === email);
    
    if (usuario) {
      // Utilizamos compareSync para la verificación
      const passwordMatch = bcrypt.compareSync(password, usuario.password); 
      
      if (passwordMatch) {
        localStorage.setItem('usuario', JSON.stringify(usuario));
        // NOTA: La navegación se maneja en los componentes (LoginComponent y HomeComponent)
        return true;
      }
    }
    return false;
  }

  // ✍️ REGISTRO (SÍNCRONO)
  register(email: string, password: string): boolean { 
    const existe = this.usuarios.find(u => u.email === email);
    if (existe) return false;

    // Genera el hash de la contraseña de forma síncrona
    const hashedPassword = bcrypt.hashSync(password, this.saltRounds);
    
    const nuevo: Usuario = { email, password: hashedPassword, rol: 'cliente' };
    this.usuarios.push(nuevo);
    this.guardarUsuarios(); 
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