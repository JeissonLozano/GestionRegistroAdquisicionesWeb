import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ListaHistorialComponent } from './pages/lista-historial/lista-historial.component';

const routes: Routes = [
  { path: ':id', component: ListaHistorialComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ListaHistorialComponent
  ],
  exports: [RouterModule]
})
export class HistorialModule { }
