// app.module.ts
import { NgModule, LOCALE_ID } from '@angular/core'; // 🔑 AÑADIDO: LOCALE_ID
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms'; 
import { CommonModule, registerLocaleData } from '@angular/common'; // 🔑 AÑADIDO: registerLocaleData

// 🔑 AÑADIDO: Importar y registrar los datos de la Locale para Chile (CLP)
import localeEsCl from '@angular/common/locales/es-CL';
registerLocaleData(localeEsCl); 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'; 
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { AdminComponent } from './Components/admin/admin.component';
import { RegisterComponent } from './Components/register/register.component';
// Componentes de Cliente/Shared
import { ReservaComponent } from './Components/reserva/reserva.component'; 
import { CatalogoSnacksComponent } from './Components/catalogo-snacks/catalogo-snacks.component'; 
import { CartSidebarComponent } from './Components/cart-sidebar/cart-sidebar.component';
// Componentes de Administración
import { AdminUsuariosComponent } from './Components/admin/admin-usuario/admin-usuario.component'; 
import { AdminPeliculasComponent } from './Components/admin/admin-peliculas/admin-peliculas.component';
import { AdminSalasComponent } from './Components/admin/admin-salas/admin-salas.component';
import { AdminSnacksComponent } from './Components/admin/admin-snacks/admin-snacks.component'; 
// Componentes de Perfil
import { PerfilUsuarioComponent } from './Components/perfil-usuario/perfil-usuario.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { PerfilCardComponent } from './Components/perfil-usuario/perfil-card/perfil-card.component';
import { PerfilTabsComponent } from './Components/perfil-usuario/perfil-tabs/perfil-tabs.component';
import { PerfilInfoComponent } from './Components/perfil-usuario/perfil-info/perfil-info.component';
import { PerfilReservasComponent } from './Components/perfil-usuario/perfil-reservas/perfil-reservas.component';
import { PerfilMetodosPagoComponent } from './Components/perfil-usuario/perfil-metodos-pago/perfil-metodos-pago.component';
import { MetodoPagoFormComponent } from './Components/perfil-usuario/metodo-pago-form/metodo-pago-form.component';
import { MetodosPagoListComponent } from './Components/perfil-usuario/metodos-pago-list/metodos-pago-list.component';


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
    AdminSnacksComponent,
    // Declaraciones de Perfil:
    PerfilUsuarioComponent,
    SidebarComponent,
    PerfilCardComponent,
    PerfilTabsComponent,
    PerfilInfoComponent,
    PerfilReservasComponent,
    PerfilMetodosPagoComponent,
    MetodoPagoFormComponent,
    MetodosPagoListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule, 
    CommonModule // Mantener CommonModule si es necesario para otros módulos compartidos, aunque BrowserModule ya lo contiene.
  ],
  providers: [
    // 🔑 AÑADIDO: Configura la locale globalmente a 'es-CL'
    { provide: LOCALE_ID, useValue: 'es-CL' } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }