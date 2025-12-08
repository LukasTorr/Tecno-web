import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { AdminComponent } from './Components/admin/admin.component';
import { RegisterComponent } from './Components/register/register.component';
// 👇 Combinación de importaciones
import { ReservaComponent } from './Components/reserva/reserva.component'; 
import { CatalogoSnacksComponent } from './Components/catalogo-snacks/catalogo-snacks.component'; 
import { CartSidebarComponent } from './Components/cart-sidebar/cart-sidebar.component'; 


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AdminComponent,
    RegisterComponent,
    // 👇 Combinación de declaraciones
    ReservaComponent, 
    CatalogoSnacksComponent, 
    CartSidebarComponent 
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