import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes Principales
import { CatalogoSnacksComponent } from './Components/catalogo-snacks/catalogo-snacks.component';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { AdminComponent } from './Components/admin/admin.component';
import { RegisterComponent } from './Components/register/register.component'; 
import { ReservaComponent } from './Components/reserva/reserva.component';

// Guards
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

// 🚀 NUEVOS COMPONENTES DE ADMINISTRACIÓN
// 🔑 CORRECCIÓN CLAVE: Cambiar AdminUsuarioComponent por AdminUsuariosComponent (Plural)
import { AdminUsuariosComponent } from './Components/admin/admin-usuario/admin-usuario.component'; 
import { AdminPeliculasComponent } from './Components/admin/admin-peliculas/admin-peliculas.component';
import { AdminSalasComponent } from './Components/admin/admin-salas/admin-salas.component';
import { AdminSnacksComponent } from './Components/admin/admin-snacks/admin-snacks.component';


const routes: Routes = [
  // ... (Rutas de Acceso Público y Cliente) ...
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }, 
  { path: 'home', component: HomeComponent },
  { path: 'snacks', component: CatalogoSnacksComponent }, 
  { path: 'reserva', component: ReservaComponent, canActivate: [AuthGuard] }, 
  
  // ⚙️ RUTA ADMINISTRADOR: Protegida y con RUTAS HIJAS
  { 
    path: 'admin', 
    component: AdminComponent, 
    canActivate: [AdminGuard],
    children: [
      { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
      
      // 🔑 CORRECCIÓN CLAVE: Usar el nombre de clase correcto en el componente
      { path: 'usuarios', component: AdminUsuariosComponent }, 
      
      { path: 'peliculas', component: AdminPeliculasComponent },
      { path: 'snacks', component: AdminSnacksComponent },
      { path: 'salas', component: AdminSalasComponent },
    ]
  }, 
  
  // ... (Resto de rutas) ...
  { path: '', redirectTo: '/home', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}