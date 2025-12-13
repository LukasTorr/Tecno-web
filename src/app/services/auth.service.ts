import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs'; 
import { UserService, User } from './user/user.service'; 


// 🔑 Interfaz para la data de la sesión (solo email y rol)
export interface SessionUsuario { 
    email: string;
    rol: 'Admin' | 'Cliente'; 
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    
    constructor(private router: Router, private userService: UserService) { } 

    // 🔑 LOGIN (SÍNCRONO)
    login(email: string, password: string): boolean {
        
        const usuarios = this.userService.getUsersListWithPasswords();
        const usuario = usuarios.find(u => u.email === email);
        
        if (usuario && usuario.password) {
            
            const passwordMatch = bcrypt.compareSync(password, usuario.password); 

            if (passwordMatch) {
                // 1. Crear el objeto de sesión con el rol exacto: 'Admin' o 'Cliente'
                const sessionData: SessionUsuario = { 
                    email: usuario.email, 
                    rol: usuario.rol as 'Admin' | 'Cliente' 
                };
                
                // 2. Guardar en sessionStorage
                sessionStorage.setItem('usuario', JSON.stringify(sessionData)); 
                return true;
            }
        }
        return false;
    }

    // ✍️ REGISTRO (SÍNCRONO)
    register(email: string, password: string): boolean { 
        
        const existe = this.userService.getUsersListWithPasswords().find(u => u.email === email);
        if (existe) return false;

        const nuevo: User = { 
            id: 0, 
            email: email, 
            password: password, 
            rol: 'Cliente',
            fechaRegistro: ''
        };
        
        this.userService.saveUser(nuevo); 
        return true;
    }
    
    // 🔑 LOGOUT
    logout(): void {
        sessionStorage.removeItem('usuario');
        this.router.navigate(['/home']); 
    }

    // 🔑 getUsuario: Obtener el usuario de sessionStorage (retorna SessionUsuario)
    getUsuario(): SessionUsuario | null { 
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