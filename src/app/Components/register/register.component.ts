import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email = '';
  password = '';
  confirm = '';
  error = '';
  success = '';

  constructor(private auth: AuthService, private router: Router) {}

  onRegister() {
    if (this.password !== this.confirm) {
      this.error = 'Las contraseñas no coinciden';
      return;
    }

    const ok = this.auth.register(this.email, this.password);
    if (!ok) {
      this.error = 'El usuario ya existe';
    } else {
      this.success = 'Cuenta creada correctamente. Ahora puedes iniciar sesión.';
      setTimeout(() => this.router.navigate(['/login']), 1500);
    }
  }
}
