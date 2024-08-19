import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../guards/admin.guard';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { BusquedasComponent } from './busquedas/busquedas.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { titulo: 'Dashboard'} },
  { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBar'} },
  { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Gráfica #1'} },
  { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de cuenta'} },
  { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas'} },
  { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de usuario'} },
  { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RXJS'} },
  { path: 'buscar/:termino', component: BusquedasComponent, data: { titulo: 'busquedas'} },

  // mantenimientos
  { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de hospitales'} },
  { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de medicos'} },
  { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Mantenimiento de medicos'} },

  // Rutas de admin_role
  { path: 'usuarios', canActivate: [AdminGuard] , component: UsuariosComponent, data: { titulo: 'Mantenimiento de aplicación'} },

]

@NgModule({
  imports: [ RouterModule.forChild(childRoutes) ],
  exports: [ RouterModule ]
})
export class ChildRoutesModule { }
