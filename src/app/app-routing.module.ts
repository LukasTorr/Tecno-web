import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Componentes de ambas ramas
import { CatalogoSnacksComponent } from './Components/catalogo-snacks/catalogo-snacks.component';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { AdminComponent } from './Components/admin/admin.component';
import { RegisterComponent } from './Components/register/register.component'; 
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { ReservaComponent } from './Components/reserva/reserva.component';


const routes: Routes = [
  // Rutas de Acceso Público
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }, 
  
  // 🔓 PÚBLICO: La página HOME ahora es accesible sin AuthGuard
  { path: 'home', component: HomeComponent },
  
  // Catálogo de Snacks: Acceso libre
  { path: 'snacks', component: CatalogoSnacksComponent }, 
  
  // 🔒 PROTEGIDO: Rutas que REQUIEREN iniciar sesión
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  { path: 'reserva', component: ReservaComponent, canActivate: [AuthGuard] }, 
  
  // 🏠 INICIO: La aplicación redirige a '/home' al iniciar
  { path: '', redirectTo: '/home', pathMatch: 'full' }, 
  
  // Redirección para rutas no encontradas
  { path: '**', redirectTo: '/home' },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}