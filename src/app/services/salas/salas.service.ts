import { Injectable } from '@angular/core';

export interface Sala {
    id: number;
    nombre: string;
    capacidad: number;
    filas: number;
    columnas: number;
    formato: '3D/IMAX' | '2D/VIP' | '2D/Estándar'| '2D/Estándar' | '2D/VIP' | '3D/Estándar'| '3D/VIP'
    | 'IMAX' | 'IMAX Laser' | 'Dolby Cinema' | 'Macro XE / ScreenX' | '4DX / D-Box'| 'Sala Atmos' 
    | 'Junior/Familiar' | 'Platinum'; // Tipos definidos
}

@Injectable({ providedIn: 'root' })
export class SalasService {
    private storageKey = 'salas';

    constructor() {
        this.initializeData();
    }

    private initializeData(): void {
        if (!localStorage.getItem(this.storageKey)) {
            // Datos iniciales (Basados en tu mock original)
            const initialSalas: Sala[] = [
                // Es crucial definir filas y columnas para calcular la capacidad, aunque el mock no las tuviera.
                { id: 301, nombre: 'Sala 1 - IMAX', capacidad: 150, formato: '3D/IMAX', filas: 10, columnas: 15 },
                { id: 302, nombre: 'Sala 2 - VIP', capacidad: 50, formato: '2D/VIP', filas: 5, columnas: 10 },
                { id: 303, nombre: 'Sala 3 - Estándar', capacidad: 96, formato: '2D/Estándar', filas: 8, columnas: 12 },
            ];
            this.saveSalas(initialSalas);
        }
    }

    private getSalas(): Sala[] {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : [];
    }

    private saveSalas(salas: Sala[]): void {
        localStorage.setItem(this.storageKey, JSON.stringify(salas));
    }
    
    // CRUD: READ
    getSalasList(): Sala[] {
        return this.getSalas();
    }
    
    // CRUD: CREATE / UPDATE
    saveSala(sala: Sala): void {
        let salas = this.getSalas();
        
        // 🔑 LÓGICA CLAVE: Recalcular capacidad basada en filas x columnas
        sala.capacidad = sala.filas * sala.columnas; 

        if (sala.id && sala.id > 0) {
            // UPDATE: Encuentra y reemplaza
            const index = salas.findIndex(s => s.id === sala.id);
            if (index !== -1) {
                salas[index] = sala;
            }
        } else {
            // CREATE: Generar un ID basado en el tiempo
            sala.id = new Date().getTime();
            salas.push(sala);
        }
        this.saveSalas(salas);
    }

    // CRUD: DELETE
    deleteSala(id: number): void {
        let salas = this.getSalas().filter(s => s.id !== id);
        this.saveSalas(salas);
    }
}