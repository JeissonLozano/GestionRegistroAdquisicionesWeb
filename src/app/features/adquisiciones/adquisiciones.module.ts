import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ListaAdquisicionesComponent } from './pages/lista-adquisiciones/lista-adquisiciones.component';
import { FormAdquisicionComponent } from './pages/form-adquisicion/form-adquisicion.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

const routes: Routes = [
  { path: '', component: ListaAdquisicionesComponent },
  { path: 'nuevo', component: FormAdquisicionComponent },
  { path: 'editar/:id', component: FormAdquisicionComponent },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ListaAdquisicionesComponent,
    FormAdquisicionComponent,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [RouterModule]
})
export class AdquisicionesModule { }
