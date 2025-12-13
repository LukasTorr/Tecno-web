import { Component, OnInit } from '@angular/core';
import { Sala, SalasService } from '../../../services/salas/salas.service';

@Component({
  selector: 'app-admin-salas',
  templateUrl: './admin-salas.component.html',
  styleUrls: ['./admin-salas.component.css']
})
export class AdminSalasComponent implements OnInit {
  salas: Sala[] = [];
  
  // Variables para la gestión del modal
  showModal: boolean = false;
  currentSala: Sala | null = null;

  constructor(private salasService: SalasService) {}

  ngOnInit(): void {
    this.loadSalas();
  }

  loadSalas(): void {
    this.salas = this.salasService.getSalasList();
  }

  // --- CRUD FUNCTIONS ---

  openCreateModal(): void {
    // Inicializa una sala vacía con filas y columnas a 0
    this.currentSala = { 
        id: 0, 
        nombre: '', 
        capacidad: 0, 
        formato: '2D/Estándar', 
        filas: 0, 
        columnas: 0 
    };
    this.showModal = true;
  }

  openEditModal(sala: Sala): void {
    // Usar spread para evitar modificar el objeto original antes de guardar
    this.currentSala = { ...sala }; 
    this.showModal = true;
  }

  saveSala(): void {
    if (this.currentSala) {
        // Validación básica
        if (!this.currentSala.nombre || this.currentSala.filas <= 0 || this.currentSala.columnas <= 0) {
            alert('El nombre, las filas y las columnas deben ser valores válidos.');
            return;
        }

        this.salasService.saveSala(this.currentSala);
        this.loadSalas(); // Recargar lista
        this.showModal = false;
        this.currentSala = null;
    }
  }

  deleteSala(id: number): void {
    // Muestra confirmación usando los últimos 4 dígitos del ID para consistencia visual
    if (confirm(`¿Estás seguro de que quieres eliminar la sala con ID de referencia ${id.toString().slice(-4)}?`)) {
        this.salasService.deleteSala(id);
        this.loadSalas();
    }
  }
}