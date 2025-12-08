import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// COMBINACIÓN: Mantener CatalogoSnacksComponent de CompraSnacks
import { CatalogoSnacksComponent } from './Components/catalogo-snacks/catalogo-snacks.component';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { AdminComponent } from './Components/admin/admin.component';
// Mantener RegisterComponent
import { RegisterComponent } from './Components/register/register.component'; 
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
// Mantener ReservaComponent de master
import { ReservaComponent } from './Components/reserva/reserva.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  // Mantener 'register'
  { path: 'register', component: RegisterComponent }, 
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  // RESOLUCIÓN DEL CONFLICTO: Incluir ambas rutas
  { path: 'snacks', component: CatalogoSnacksComponent }, // Agregado de CompraSnacks
  { path: 'reserva', component: ReservaComponent }, // Agregado de master
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}