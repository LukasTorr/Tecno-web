import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { AdminComponent } from './Components/admin/admin.component';
import { RegisterComponent } from './Components/register/register.component';
// RESOLUCIÓN DEL CONFLICTO: Incluir los componentes de ambas ramas
import { ReservaComponent } from './Components/reserva/reserva.component'; // De master
import { CatalogoSnacksComponent } from './Components/catalogo-snacks/catalogo-snacks.component'; // De CompraSnacks
import { CartSidebarComponent } from './Components/cart-sidebar/cart-sidebar.component';
import { CompraCarrosComponent } from './Components/Components/compra-carros/compra-carros.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AdminComponent,
    RegisterComponent,
    // RESOLUCIÓN DEL CONFLICTO: Declarar todos los componentes
    ReservaComponent, // De master
    CatalogoSnacksComponent, // De CompraSnacks
    CartSidebarComponent, CompraCarrosComponent // De CompraSnacks
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }