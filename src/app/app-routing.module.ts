import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { PerfilUsuarioComponent } from './Components/perfil-usuario/perfil-usuario.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'perfil', component: PerfilUsuarioComponent },
  //{ path: '**', redirectTo: '' }, // Redirige rutas no encontradas al home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
