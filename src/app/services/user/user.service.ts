// src/app/services/user.service.ts

import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs'; 

export interface User {
    id: number;
    email: string;
    rol: 'Admin' | 'Cliente';
    fechaRegistro: string;
    password?: string;
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private USERS_STORAGE_KEY = 'cine_users';
    private readonly saltRounds = 10; 

    constructor() {
        this.initializeDefaultUsers();
    }

    private initializeDefaultUsers(): void {
        const users = this.getUsersListWithPasswords();
        if (users.length === 0) {
            // 🔑 HASHING INICIAL: admin y 123
            const adminHash = bcrypt.hashSync('1234', this.saltRounds);
            const clienteHash = bcrypt.hashSync('1234', this.saltRounds);

            const defaultUsers: User[] = [
                { id: 1, email: 'admin@cine.com', rol: 'Admin', fechaRegistro: '2023-01-01', password: adminHash },
                { id: 2, email: 'cliente@cine.com', rol: 'Cliente', fechaRegistro: '2023-01-15', password: clienteHash },
            ];
            localStorage.setItem(this.USERS_STORAGE_KEY, JSON.stringify(defaultUsers));
        }
    }

    // MÉTODOS PÚBLICOS PARA EL COMPONENTE DE ADMIN (SIN PASSWORD)
    getUsersList(): User[] {
        const usersJson = localStorage.getItem(this.USERS_STORAGE_KEY);
        const users: User[] = usersJson ? JSON.parse(usersJson) : [];
        return users.map(user => {
            const { password, ...userWithoutPassword } = user; 
            return userWithoutPassword as User;
        });
    }

    // MÉTODOS INTERNOS/PRIVADOS (CON PASSWORD HASHED)
    getUsersListWithPasswords(): User[] {
        const usersJson = localStorage.getItem(this.USERS_STORAGE_KEY);
        return usersJson ? JSON.parse(usersJson) : [];
    }

    saveUser(user: User): void {
        const users = this.getUsersListWithPasswords();
        
        let passwordHash: string | undefined;

        if (user.password) {
            // HASHING: Si se proporciona una nueva contraseña, la hasheamos
            passwordHash = bcrypt.hashSync(user.password, this.saltRounds);
            user.password = passwordHash;
        }

        if (user.id === 0) {
            // CREAR: Asignar nuevo ID y fecha
            const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
            user.id = newId;
            user.fechaRegistro = new Date().toISOString().split('T')[0];
            users.push(user);
        } else {
            // EDITAR: Encontrar y reemplazar
            const index = users.findIndex(u => u.id === user.id);
            if (index !== -1) {
                const originalUser = users[index];
                
                // Si la nueva contraseña no se proporcionó, mantenemos el hash original
                if (!passwordHash) {
                    user.password = originalUser.password;
                }
                user.fechaRegistro = originalUser.fechaRegistro; 
                users[index] = user;
            }
        }
        
        localStorage.setItem(this.USERS_STORAGE_KEY, JSON.stringify(users));
    }

    deleteUser(id: number): void {
        let users = this.getUsersListWithPasswords();
        users = users.filter(u => u.id !== id);
        localStorage.setItem(this.USERS_STORAGE_KEY, JSON.stringify(users));
    }
}