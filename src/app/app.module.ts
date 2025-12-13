import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'; // 🔑 Importar AppComponent
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { AdminComponent } from './Components/admin/admin.component';
import { RegisterComponent } from './Components/register/register.component';
// 👇 Componentes de Cliente/Shared
import { ReservaComponent } from './Components/reserva/reserva.component'; 
import { CatalogoSnacksComponent } from './Components/catalogo-snacks/catalogo-snacks.component'; 
import { CartSidebarComponent } from './Components/cart-sidebar/cart-sidebar.component';
// 👇 Componentes de Administración
import { AdminUsuariosComponent } from './Components/admin/admin-usuario/admin-usuario.component'; 
import { AdminPeliculasComponent } from './Components/admin/admin-peliculas/admin-peliculas.component';
import { AdminSalasComponent } from './Components/admin/admin-salas/admin-salas.component';
import { AdminSnacksComponent } from './Components/admin/admin-snacks/admin-snacks.component'; 


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AdminComponent,
    RegisterComponent,
    ReservaComponent, 
    CatalogoSnacksComponent, 
    CartSidebarComponent, 
    AdminUsuariosComponent, 
    AdminPeliculasComponent, 
    AdminSalasComponent, 
    AdminSnacksComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [
    AppComponent // 🔑 ADICIÓN CLAVE: Añadir AppComponent a providers para poder inyectarlo en HomeComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }