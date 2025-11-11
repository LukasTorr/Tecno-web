import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private auth: AuthService) {}

  onLogin() {
    const success = this.auth.login(this.email, this.password);
    if (!success) this.error = 'Usuario o contraseña incorrectos';
  }
}
