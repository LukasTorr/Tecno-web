import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // 👈 agregado para [(ngModel)] en el login
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { PerfilUsuarioComponent } from './Components/perfil-usuario/perfil-usuario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { PerfilCardComponent } from './Components/perfil-usuario/perfil-card/perfil-card.component';
import { PerfilTabsComponent } from './Components/perfil-usuario/perfil-tabs/perfil-tabs.component';
import { PerfilInfoComponent } from './Components/perfil-usuario/perfil-info/perfil-info.component';
import { PerfilReservasComponent } from './Components/perfil-usuario/perfil-reservas/perfil-reservas.component';
import { LoginComponent } from './Components/login/login.component';
import { AdminComponent } from './Components/admin/admin.component';
import { RegisterComponent } from './Components/register/register.component';
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
    FormsModule, // 👈 agregado aquí,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
