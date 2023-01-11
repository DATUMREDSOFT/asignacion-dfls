import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsignacionComponent } from './pages/asignacion/asignacion.component';

const routes: Routes = [
  { path: 'asignacion/:id', component: AsignacionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
