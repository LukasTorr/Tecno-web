/*import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-perfil-card',
  templateUrl: './perfil-card.component.html',
  styleUrls: ['./perfil-card.component.css'],
})
export class PerfilCardComponent {
  @Input() usuario: Usuario | null = null;

  @ViewChild('fileInput') fileInput!: ElementRef;

    triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const base64 = reader.result as string;

      if (this.usuario) {
        this.authService.actualizarFoto(this.usuario.id, base64);
        this.usuario.foto = base64; // Para actualizar la vista
      }
    };

    reader.readAsDataURL(file);
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-perfil-card',
  templateUrl: './perfil-card.component.html',
  styleUrls: ['./perfil-card.component.css'],
})
export class PerfilCardComponent implements OnInit {
  usuario: Usuario | null = null;
  editando = false;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.usuario = this.auth.getUsuario();
  }

  cambiarFoto(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (this.usuario) {
        this.usuario.foto = reader.result as string;
        this.auth.actualizarUsuario(this.usuario);
      }
    };

    reader.readAsDataURL(file);
  }

  toggleEdit() {
    this.editando = !this.editando;

    if (!this.editando && this.usuario) {
      this.auth.actualizarUsuario(this.usuario);
    }
  }
}*/

import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-perfil-card',
  templateUrl: './perfil-card.component.html',
  styleUrls: ['./perfil-card.component.css'],
})
export class PerfilCardComponent {
  @Input() usuario: Usuario | null = null;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(private authService: AuthService) {}

  //fotoUrl: string | ArrayBuffer | null = null;

  cambiarFoto(event: any) {
    const archivo = event.target.files[0];
    if (!archivo) return;

    const lector = new FileReader();
    lector.onload = () => {
      if (this.usuario) {
        this.usuario.foto = lector.result as string;
        this.authService.actualizarUsuario(this.usuario); // si lo usas
      }
    };
    lector.readAsDataURL(archivo);
  }
}
