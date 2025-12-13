import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../../../services/user/user.service'; 

@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuario.component.html',
  styleUrls: ['./admin-usuario.component.css']
})
export class AdminUsuariosComponent implements OnInit {
  
  usuarios: User[] = [];
  
  showModal: boolean = false;
  currentUser: User | null = null;
  newPasswordValue: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.usuarios = this.userService.getUsersList();
  }

  // --- MODAL Y CRUD FUNCTIONS ---

  openCreateModal(): void {
    this.currentUser = { 
        id: 0, 
        email: '', 
        rol: 'Cliente', 
        fechaRegistro: new Date().toISOString().split('T')[0]
    };
    this.newPasswordValue = '';
    this.showModal = true;
  }

  openEditModal(user: User): void {
    this.currentUser = { ...user }; 
    this.newPasswordValue = '';
    this.showModal = true;
  }

  saveUser(): void {
    if (this.currentUser) {
        if (!this.currentUser.email || !this.currentUser.rol) {
            alert('El email y el rol son obligatorios.');
            return;
        }

        let userToSave: User = { ...this.currentUser };

        // 2. Manejo de la contraseña y validación de longitud
        if (this.newPasswordValue) {
            // 🔑 CORRECCIÓN CLAVE: Cambiamos <= 4 a < 4
            if (this.newPasswordValue.length < 4) {
                alert('La contraseña debe tener al menos 4 caracteres.'); // Ajuste del mensaje
                return;
            }
            userToSave.password = this.newPasswordValue;

        } else if (userToSave.id === 0) {
            // Si es un nuevo usuario y no se proporcionó contraseña
            alert('La contraseña es obligatoria para un nuevo usuario.');
            return;
        }

        // 3. Llamar al servicio
        this.userService.saveUser(userToSave);
        
        // 4. Resetear y cerrar
        this.loadUsers(); 
        this.showModal = false;
        this.currentUser = null;
        this.newPasswordValue = '';
    }
  }

  deleteUser(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
        this.userService.deleteUser(id);
        this.loadUsers();
    }
  }
}