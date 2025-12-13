// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes Principales
import { CatalogoSnacksComponent } from './Components/catalogo-snacks/catalogo-snacks.component';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { PerfilUsuarioComponent } from './Components/perfil-usuario/perfil-usuario.component';
import { AdminComponent } from './Components/admin/admin.component';
import { RegisterComponent } from './Components/register/register.component';
import { ReservaComponent } from './Components/reserva/reserva.component';

// Guards
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

// 🚀 NUEVOS COMPONENTES DE ADMINISTRACIÓN
import { AdminUsuariosComponent } from './Components/admin/admin-usuario/admin-usuario.component'; 
import { AdminPeliculasComponent } from './Components/admin/admin-peliculas/admin-peliculas.component';
import { AdminSalasComponent } from './Components/admin/admin-salas/admin-salas.component';
import { AdminSnacksComponent } from './Components/admin/admin-snacks/admin-snacks.component';


const routes: Routes = [
  // Rutas de Acceso Público
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }, 
  { path: 'home', component: HomeComponent },
  { path: 'snacks', component: CatalogoSnacksComponent }, 
  
  // Rutas de Cliente Protegidas
  { path: 'reserva', component: ReservaComponent, canActivate: [AuthGuard] }, 
  { 
    path: 'perfil', 
    component: PerfilUsuarioComponent, 
    canActivate: [AuthGuard] 
  },
  
  // ⚙️ RUTA ADMINISTRADOR: Protegida y con RUTAS HIJAS (Tomado de master)
  { 
    path: 'admin', 
    component: AdminComponent, 
    canActivate: [AdminGuard],
    children: [
      { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
      { path: 'usuarios', component: AdminUsuariosComponent }, 
      { path: 'peliculas', component: AdminPeliculasComponent },
      { path: 'snacks', component: AdminSnacksComponent },
      { path: 'salas', component: AdminSalasComponent },
    ]
  }, 
  
  // Ruta por defecto y 404
  { path: '', redirectTo: '/home', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}