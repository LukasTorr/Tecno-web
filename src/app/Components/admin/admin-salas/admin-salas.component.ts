import { Component, OnInit } from '@angular/core';
import { Sala, SalasService } from '../../../services/salas/salas.service';

@Component({
  selector: 'app-admin-salas',
  templateUrl: './admin-salas.component.html',
  styleUrls: ['./admin-salas.component.css']
})
export class AdminSalasComponent implements OnInit {
  salas: Sala[] = [];
  
  showModal: boolean = false;
  currentSala: Sala | null = null;
  
  // 🔑 Propiedad para editar el precio en el modal (separada del objeto principal)
  modalPrecioBase: number = 0; 

  constructor(private salasService: SalasService) {}

  ngOnInit(): void {
    this.loadSalas();
  }

  loadSalas(): void {
    this.salas = this.salasService.getSalasList();
  }

  // --- CRUD FUNCTIONS ---

  openCreateModal(): void {
    // 🔑 Inicializa con precioBase para satisfacer la interfaz y el valor CLP base
    this.currentSala = { 
        id: 0, 
        nombre: '', 
        capacidad: 0, 
        formato: '2D/Estándar', 
        filas: 0, 
        columnas: 0,
        precioBase: 5000 // 🔑 VALOR BASE INICIAL
    };
    this.modalPrecioBase = 5000; // Sincroniza el campo del modal
    this.showModal = true;
  }

  openEditModal(sala: Sala): void {
    // Clonar la sala para editar
    this.currentSala = { ...sala }; 
    // 🔑 SINCRONIZACIÓN: Carga el precio actual de la sala en el campo de edición
    this.modalPrecioBase = sala.precioBase; 
    this.showModal = true;
  }

  saveSala(): void {
    if (this.currentSala) {
        // 🔑 ASIGNACIÓN CLAVE: Mueve el precio editado del modal al objeto principal
        this.currentSala.precioBase = this.modalPrecioBase; 
        
        // 🔑 VALIDACIÓN: Asegurar que el precio es positivo
        if (!this.currentSala.nombre || this.currentSala.filas <= 0 || this.currentSala.columnas <= 0 || this.currentSala.precioBase <= 0) {
            alert('El nombre, las dimensiones y el precio base deben ser valores positivos y válidos.');
            return;
        }

        this.salasService.saveSala(this.currentSala);
        this.loadSalas(); // Recargar lista
        this.showModal = false;
        this.currentSala = null;
    }
  }

  deleteSala(id: number): void {
    if (confirm(`¿Estás seguro de que quieres eliminar la sala con ID de referencia ${id.toString().slice(-4)}?`)) {
        this.salasService.deleteSala(id);
        this.loadSalas();
    }
  }
}