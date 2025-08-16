import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { EstadisticasService, EstadisticasHome, Adquisicion } from '../../core/services/estadisticas.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule, HeaderComponent]
})
export class HomeComponent implements OnInit {
  private router = inject(Router);
  private estadisticasService = inject(EstadisticasService);

  estadisticas: EstadisticasHome | null = null;
  adquisicionesPreview: Adquisicion[] = [];
  cargando = true;
  error = false;

  ngOnInit(): void {
    this.cargarDatos();
  }

  /**
   * Carga los datos dinámicos del home
   */
  private cargarDatos(): void {
    this.cargando = true;
    this.error = false;

    // Cargar estadísticas
    this.estadisticasService.obtenerEstadisticasHome().subscribe({
      next: (estadisticas) => {
        this.estadisticas = estadisticas;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar estadísticas:', error);
        this.error = true;
        this.cargando = false;
      }
    });

    // Cargar preview de adquisiciones
    this.estadisticasService.obtenerAdquisicionesPreview().subscribe({
      next: (adquisiciones) => {
        this.adquisicionesPreview = adquisiciones;
      },
      error: (error) => {
        console.error('Error al cargar preview de adquisiciones:', error);
      }
    });
  }

  /**
   * Formatea un valor monetario
   */
  formatearMoneda(valor: number): string {
    return this.estadisticasService.formatearMoneda(valor);
  }

  /**
   * Formatea un número con separadores de miles
   */
  formatearNumero(valor: number): string {
    return this.estadisticasService.formatearNumero(valor);
  }

  /**
   * Navega a la página de crear adquisición
   */
  irACrear(): void {
    this.router.navigate(['/adquisiciones/nuevo']);
  }

  /**
   * Navega a la página de consultar adquisiciones
   */
  irAConsultar(): void {
    this.router.navigate(['/adquisiciones']);
  }

  /**
   * Recarga los datos en caso de error
   */
  recargarDatos(): void {
    this.cargarDatos();
  }
}
