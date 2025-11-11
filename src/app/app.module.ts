import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PerfilUsuarioComponent,
    SidebarComponent,
    PerfilCardComponent,
    PerfilTabsComponent,
    PerfilInfoComponent,
    PerfilReservasComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
