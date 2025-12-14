import { Injectable } from '@angular/core';

export interface Snack {
    id: number;
    nombre: string;
    precio: number; // Precio en CLP
    stock: number;
    imageUrl: string; // URL de la imagen
}

@Injectable({
    providedIn: 'root'
})
export class SnackService {
    private SNACKS_STORAGE_KEY = 'cine_snacks';

    constructor() {
        this.initializeDefaultSnacks();
    }

    private initializeDefaultSnacks(): void {
        if (!localStorage.getItem(this.SNACKS_STORAGE_KEY)) {
            // Datos iniciales (con precios en CLP)
            const initialSnacks: Snack[] = [
                { id: 201, nombre: 'PopCorn Grande', precio: 15000, stock: 100, imageUrl: 'assets/image/snacks/largepopcorn.jpg' },
                { id: 202, nombre: 'Ramitas Evercrisp', precio: 2690, stock: 50, imageUrl: 'assets/image/snacks/ramitas.jpg' },
                { id: 203, nombre: 'Bebida Mediana 600ml', precio: 5900, stock: 80, imageUrl: 'assets/image/snacks/mediumdrink.jpg' },
                { id: 204, nombre: 'M&M 48g', precio: 3000, stock: 120, imageUrl: 'assets/image/snacks/M&M.jpg' },
            ];
            this.saveAllSnacks(initialSnacks);
        }
    }
    
    // Método auxiliar para guardar toda la lista
    private saveAllSnacks(snacks: Snack[]): void {
        localStorage.setItem(this.SNACKS_STORAGE_KEY, JSON.stringify(snacks));
    }

    // CRUD: READ
    getSnacksList(): Snack[] {
        const data = localStorage.getItem(this.SNACKS_STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    }
    
    // CRUD: CREATE / UPDATE
    saveSnack(snack: Snack): void {
        let snacks = this.getSnacksList();
        
        if (snack.id && snack.id > 0) {
            // UPDATE
            const index = snacks.findIndex(s => s.id === snack.id);
            if (index !== -1) {
                snacks[index] = snack;
            }
        } else {
            // CREATE: Asignar un ID basado en el tiempo para asegurar unicidad
            snack.id = new Date().getTime();
            snacks.push(snack);
        }
        this.saveAllSnacks(snacks);
    }

    // CRUD: DELETE
    deleteSnack(id: number): void {
        let snacks = this.getSnacksList().filter(s => s.id !== id);
        this.saveAllSnacks(snacks);
    }
}