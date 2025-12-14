import { Component, OnInit } from '@angular/core';
import { Snack, SnackService } from '../../../services/snack/snack.service'; // 🔑 Importar el nuevo servicio

@Component({
  selector: 'app-admin-snacks',
  templateUrl: './admin-snacks.component.html',
  styleUrls: ['./admin-snacks.component.css']
})
export class AdminSnacksComponent implements OnInit {
  snacks: Snack[] = [];
  
  // Variables para la gestión del modal
  showModal: boolean = false;
  currentSnack: Snack | null = null;
  
  constructor(private snackService: SnackService) {} // 🔑 INYECTAR SERVICIO

  ngOnInit(): void {
    this.loadSnacks();
  }
  

  loadSnacks(): void {
    this.snacks = this.snackService.getSnacksList();
  }

  // --- CRUD FUNCTIONS ---

  openCreateModal(): void {
    // Inicializa un snack vacío
    this.currentSnack = { 
        id: 0, 
        nombre: '', 
        precio: 1000, // Precio base CLP inicial
        stock: 1, 
        imageUrl: ''
    };
    this.showModal = true;
  }

  openEditModal(snack: Snack): void {
    // Clonar el objeto para editar
    this.currentSnack = { ...snack }; 
    this.showModal = true;
  }

  saveSnack(): void {
    if (this.currentSnack) {
        // Validación básica
        if (!this.currentSnack.nombre || this.currentSnack.precio <= 0 || this.currentSnack.stock < 0 || !this.currentSnack.imageUrl) {
            alert('Todos los campos (Nombre, Precio > 0, Stock >= 0, URL de Imagen) son obligatorios.');
            return;
        }

        this.snackService.saveSnack(this.currentSnack);
        this.loadSnacks(); // Recargar lista
        this.showModal = false;
        this.currentSnack = null;
    }
  }

  deleteSnack(id: number): void {
    if (confirm(`¿Estás seguro de que quieres eliminar este snack (ID: ${id})?`)) {
        this.snackService.deleteSnack(id);
        this.loadSnacks();
    }
  }
}