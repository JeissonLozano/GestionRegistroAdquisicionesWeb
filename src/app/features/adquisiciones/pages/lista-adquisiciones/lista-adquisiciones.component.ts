import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppState } from '../../../../core/state/app.state';
import { Observable } from 'rxjs';
import { selectAdquisiciones, selectAdquisicionesLoading } from '../../../../core/state/adquisiciones/adquisiciones.selectors';
import { cargarAdquisiciones, desactivarAdquisicion } from '../../../../core/state/adquisiciones/adquisiciones.actions';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../../../../shared/components/header/header.component';

@Component({
  selector: 'app-lista-adquisiciones',
  standalone: true,
  templateUrl: './lista-adquisiciones.component.html',
  styleUrls: ['./lista-adquisiciones.component.scss'],
  imports: [CommonModule, FormsModule, MatIconModule, HeaderComponent]
})
export class ListaAdquisicionesComponent implements OnInit {
  private store = inject(Store<AppState>);
  private router = inject(Router);

  adquisiciones$: Observable<any> = this.store.select(selectAdquisiciones);
  loading$: Observable<boolean> = this.store.select(selectAdquisicionesLoading);

  adquisicionesFiltradas: any[] = [];
  terminoBusqueda: string = '';
  
  // Paginación
  paginaActual: number = 1;
  elementosPorPagina: number = 10;
  totalPaginas: number = 1;
  paginas: number[] = [];

  // Estadísticas
  totalPresupuesto: number = 0;
  totalAdquisiciones: number = 0;
  totalProveedores: number = 0;
  adquisicionesEsteMes: number = 0;

  // Referencia a Math para usar en el template
  Math = Math;

  ngOnInit(): void {
    this.store.dispatch(cargarAdquisiciones());
    this.adquisiciones$.subscribe(adquisiciones => {
      this.adquisicionesFiltradas = adquisiciones;
      this.calcularEstadisticas();
      this.calcularPaginacion();
    });
  }

  // Búsqueda general
  buscarAdquisiciones(): void {
    if (!this.terminoBusqueda.trim()) {
      this.adquisiciones$.subscribe(adquisiciones => {
        this.adquisicionesFiltradas = adquisiciones;
        this.calcularEstadisticas();
        this.calcularPaginacion();
      });
      return;
    }

    this.adquisiciones$.subscribe(adquisiciones => {
      this.adquisicionesFiltradas = adquisiciones.filter((adq: any) =>
        adq.proveedor?.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        adq.tipoBienServicio?.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        adq.documentacion?.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        adq.unidadAdministrativa?.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
      );
      this.calcularEstadisticas();
      this.calcularPaginacion();
    });
  }

  // Calcular estadísticas
  calcularEstadisticas(): void {
    if (this.adquisicionesFiltradas.length === 0) return;

    this.totalAdquisiciones = this.adquisicionesFiltradas.length;
    this.totalPresupuesto = this.adquisicionesFiltradas.reduce((sum, adq) => sum + (adq.presupuesto || 0), 0);
    
    // Contar proveedores únicos
    const proveedoresUnicos = new Set(this.adquisicionesFiltradas.map(adq => adq.proveedor).filter(Boolean));
    this.totalProveedores = proveedoresUnicos.size;

    // Contar adquisiciones del mes actual
    const mesActual = new Date().getMonth();
    const añoActual = new Date().getFullYear();
    this.adquisicionesEsteMes = this.adquisicionesFiltradas.filter(adq => {
      const fecha = new Date(adq.fechaAdquisicion);
      return fecha.getMonth() === mesActual && fecha.getFullYear() === añoActual;
    }).length;
  }

  // Calcular paginación
  calcularPaginacion(): void {
    this.totalPaginas = Math.ceil(this.adquisicionesFiltradas.length / this.elementosPorPagina);
    this.paginas = Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
    
    // Asegurar que la página actual sea válida
    if (this.paginaActual > this.totalPaginas) {
      this.paginaActual = 1;
    }
  }

  // Obtener adquisiciones de la página actual
  get adquisicionesPaginadas(): any[] {
    const inicio = (this.paginaActual - 1) * this.elementosPorPagina;
    const fin = inicio + this.elementosPorPagina;
    return this.adquisicionesFiltradas.slice(inicio, fin);
  }

  // Cambiar página
  cambiarPagina(pagina: number): void {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaActual = pagina;
    }
  }

  // Mostrar filtros avanzados
  mostrarFiltrosAvanzados(): void {
    // Implementar lógica para mostrar filtros avanzados
    console.log('Mostrar filtros avanzados');
  }

  // Exportar a Excel
  exportarExcel(): void {
    // Implementar lógica para exportar a Excel
    console.log('Exportar a Excel');
  }

  volver(): void {
    this.router.navigate(['/']);
  }

  editarAdquisicion(id: number): void {
    this.router.navigate(['/adquisiciones/editar', id]);
  }

  desactivarAdquisicion(id: number): void {
    if (confirm('¿Estás seguro de que deseas desactivar esta adquisición?')) {
      this.store.dispatch(desactivarAdquisicion({ id }));
    }
  }

  verHistorial(id: number): void {
    this.router.navigate([`/historial/${id}`]);
  }
}
