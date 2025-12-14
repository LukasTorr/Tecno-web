// src/app/services/reserva/reservation.service.ts

import { Injectable } from '@angular/core';

export interface Reservation {
    id: number;
    userEmail: string; 
    pelicula: string;
    sala: string;
    fecha: string;
    hora: string;
    asientos: string[]; 
    totalSnacks: number;
    totalPagar: number;
}

@Injectable({
    providedIn: 'root'
})
export class ReservationService {
    private RESERVATIONS_STORAGE_KEY = 'cine_reservas';

    constructor() {
        this.initializeDefaultReservations();
    }

    // 🔑 CORRECCIÓN: Inicializa solo con un array vacío para no inyectar datos de prueba
    private initializeDefaultReservations(): void {
        const data = localStorage.getItem(this.RESERVATIONS_STORAGE_KEY);
        if (!data) {
            const defaultReservations: Reservation[] = []; 
            localStorage.setItem(this.RESERVATIONS_STORAGE_KEY, JSON.stringify(defaultReservations));
        }
    }
    
    public getAllReservations(): Reservation[] { 
        const data = localStorage.getItem(this.RESERVATIONS_STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    }
    
    getReservationsByUser(email: string): Reservation[] {
        const allReservations = this.getAllReservations();
        return allReservations
            .filter(r => r.userEmail === email)
            .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
    }

    saveReservation(reservation: Reservation): void {
        const allReservations = this.getAllReservations();
        const newId = allReservations.length > 0 ? Math.max(...allReservations.map(r => r.id)) + 1 : 1;
        reservation.id = newId;
        allReservations.push(reservation);
        localStorage.setItem(this.RESERVATIONS_STORAGE_KEY, JSON.stringify(allReservations));
    }
}