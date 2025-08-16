import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface EstadisticasHome {
  totalRequerimientos: number;
  presupuestoTotal: number;
  totalProveedores: number;
  adquisicionesEsteMes: number;
  topCategorias: Array<{
    categoria: string;
    valor: number;
    porcentaje: number;
  }>;
}

export interface Adquisicion {
  id: number;
  presupuesto: number;
  unidadAdministrativa: string;
  tipoBienServicio: string;
  cantidad: number;
  valorUnitario: number;
  valorTotal: number;
  fechaAdquisicion: string;
  proveedor: string;
  documentacion: string;
  activo: boolean;
  fechaCreacion: string;
  fechaModificacion: string;
}

@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:7195/api';

  /**
   * Obtiene las estadísticas para el dashboard del home
   */
  obtenerEstadisticasHome(): Observable<EstadisticasHome> {
    return this.http.get<Adquisicion[]>(`${this.baseUrl}/Adquisiciones`).pipe(
      map(adquisiciones => this.calcularEstadisticas(adquisiciones))
    );
  }

  /**
   * Obtiene las adquisiciones para el preview del dashboard
   */
  obtenerAdquisicionesPreview(): Observable<Adquisicion[]> {
    return this.http.get<Adquisicion[]>(`${this.baseUrl}/Adquisiciones`).pipe(
      map(adquisiciones => adquisiciones.slice(0, 3)) // Solo las primeras 3 para el preview
    );
  }

  /**
   * Calcula las estadísticas basadas en las adquisiciones
   */
  private calcularEstadisticas(adquisiciones: Adquisicion[]): EstadisticasHome {
    const adquisicionesActivas = adquisiciones.filter(adq => adq.activo);
    
    // Total de requerimientos activos
    const totalRequerimientos = adquisicionesActivas.length;
    
    // Presupuesto total
    const presupuestoTotal = adquisicionesActivas.reduce((sum, adq) => sum + adq.presupuesto, 0);
    
    // Proveedores únicos
    const proveedoresUnicos = new Set(adquisicionesActivas.map(adq => adq.proveedor));
    const totalProveedores = proveedoresUnicos.size;
    
    // Adquisiciones del mes actual
    const mesActual = new Date().getMonth();
    const añoActual = new Date().getFullYear();
    const adquisicionesEsteMes = adquisicionesActivas.filter(adq => {
      const fecha = new Date(adq.fechaAdquisicion);
      return fecha.getMonth() === mesActual && fecha.getFullYear() === añoActual;
    }).length;
    
    // Top categorías por valor
    const categoriasMap = new Map<string, number>();
    adquisicionesActivas.forEach(adq => {
      const categoria = adq.tipoBienServicio;
      const valorActual = categoriasMap.get(categoria) || 0;
      categoriasMap.set(categoria, valorActual + adq.valorTotal);
    });
    
    const topCategorias = Array.from(categoriasMap.entries())
      .map(([categoria, valor]) => ({
        categoria,
        valor,
        porcentaje: (valor / presupuestoTotal) * 100
      }))
      .sort((a, b) => b.valor - a.valor)
      .slice(0, 3); // Top 3 categorías
    
    return {
      totalRequerimientos,
      presupuestoTotal,
      totalProveedores,
      adquisicionesEsteMes,
      topCategorias
    };
  }

  /**
   * Formatea un número como moneda colombiana
   */
  formatearMoneda(valor: number): string {
    if (valor >= 1000000000) {
      return `$${(valor / 1000000000).toFixed(1)}M`;
    } else if (valor >= 1000000) {
      return `$${(valor / 1000000).toFixed(1)}M`;
    } else if (valor >= 1000) {
      return `$${(valor / 1000).toFixed(0)}K`;
    }
    return `$${valor.toLocaleString()}`;
  }

  /**
   * Formatea un número con separadores de miles
   */
  formatearNumero(valor: number): string {
    return valor.toLocaleString();
  }
} 