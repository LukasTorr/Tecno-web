import { Component, Input } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-perfil-card',
  templateUrl: './perfil-card.component.html',
  styleUrls: ['./perfil-card.component.css'],
})
export class PerfilCardComponent {
  @Input() usuario: Usuario | null = null;
}
