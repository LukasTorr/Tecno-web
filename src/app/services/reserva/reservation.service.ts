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

// 🔑 NUEVA INTERFAZ PARA DATOS TEMPORALES DE ASIENTOS
export interface TempReservation {
    pelicula: string;
    sala: string;
    hora: string;
    fecha: string;
    asientos: string[];
    totalAsientos: number; // Costo solo de los asientos
    userEmail: string;
}

@Injectable({
    providedIn: 'root'
})
export class ReservationService {
    private RESERVATIONS_STORAGE_KEY = 'cine_reservas';
    private tempReservationKey = 'cine_temp_reserva'; 

    constructor() {
        this.initializeDefaultReservations();
    }

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

    // --- TEMPORAL RESERVATION LOGIC ---

    setTempReservation(data: TempReservation): void {
        sessionStorage.setItem(this.tempReservationKey, JSON.stringify(data));
    }

    getTempReservation(): TempReservation | null {
        const data = sessionStorage.getItem(this.tempReservationKey);
        return data ? JSON.parse(data) : null;
    }

    clearTempReservation(): void {
        sessionStorage.removeItem(this.tempReservationKey);
    }

    // 🔑 MÉTODO CLAVE: Guarda la reserva final (Asientos + Snacks)
    saveFinalReservation(reservationData: TempReservation, totalSnacks: number, totalPagarSnacks: number): void {
        const allReservations = this.getAllReservations();
        
        const totalFinal = reservationData.totalAsientos + totalPagarSnacks;

        const finalReservation: Reservation = {
            id: 0, 
            userEmail: reservationData.userEmail,
            pelicula: reservationData.pelicula,
            sala: reservationData.sala,
            fecha: reservationData.fecha,
            hora: reservationData.hora,
            asientos: reservationData.asientos,
            totalSnacks: totalPagarSnacks, 
            totalPagar: totalFinal 
        };
        
        const newId = allReservations.length > 0 ? Math.max(...allReservations.map(r => r.id)) + 1 : 1;
        finalReservation.id = newId;

        allReservations.push(finalReservation);
        localStorage.setItem(this.RESERVATIONS_STORAGE_KEY, JSON.stringify(allReservations));
        
        this.clearTempReservation();
    }

    // El antiguo saveReservation (solo asientos)
    saveReservation(reservation: Reservation): void {
        const allReservations = this.getAllReservations();
        const newId = allReservations.length > 0 ? Math.max(...allReservations.map(r => r.id)) + 1 : 1;
        reservation.id = newId;
        allReservations.push(reservation);
        localStorage.setItem(this.RESERVATIONS_STORAGE_KEY, JSON.stringify(allReservations));
    }
}