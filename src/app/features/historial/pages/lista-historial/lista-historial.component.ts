import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { cargarHistorial } from '../../../../core/state/historial/historial.actions';
import { selectHistorial } from '../../../../core/state/historial/historial.selectors';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../../shared/components/header/header.component';

@Component({
  selector: 'app-lista-historial',
  standalone: true,
  templateUrl: './lista-historial.component.html',
  styleUrls: ['./lista-historial.component.scss'],
  imports: [CommonModule, HeaderComponent]
})
export class ListaHistorialComponent implements OnInit {
  private store = inject(Store);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  historial$: Observable<any> = this.store.select(selectHistorial);

  ngOnInit(): void {
    const adquisicionId = Number(this.route.snapshot.paramMap.get('id'));
    if (adquisicionId) {
      this.store.dispatch(cargarHistorial({ adquisicionId }));
    }
  }

  // Métodos para estadísticas
  obtenerUsuariosUnicos(): number {
    let historial: any[] = [];
    this.historial$.subscribe(h => historial = h || []).unsubscribe();
    
    if (historial.length === 0) return 0;
    
    const usuariosUnicos = new Set(historial.map(cambio => cambio.modificadoPor).filter(Boolean));
    return usuariosUnicos.size;
  }

  obtenerCambiosEsteMes(): number {
    let historial: any[] = [];
    this.historial$.subscribe(h => historial = h || []).unsubscribe();
    
    if (historial.length === 0) return 0;
    
    const mesActual = new Date().getMonth();
    const añoActual = new Date().getFullYear();
    
    return historial.filter(cambio => {
      const fecha = new Date(cambio.fechaCambio);
      return fecha.getMonth() === mesActual && fecha.getFullYear() === añoActual;
    }).length;
  }

  obtenerCamposMasModificados(): string {
    let historial: any[] = [];
    this.historial$.subscribe(h => historial = h || []).unsubscribe();
    
    if (historial.length === 0) return 'N/A';
    
    const camposCount: { [key: string]: number } = {};
    
    historial.forEach(cambio => {
      const campo = cambio.campoModificado;
      if (campo) {
        camposCount[campo] = (camposCount[campo] || 0) + 1;
      }
    });
    
    if (Object.keys(camposCount).length === 0) return 'N/A';
    
    const campoMasModificado = Object.keys(camposCount).reduce((a, b) => 
      camposCount[a] > camposCount[b] ? a : b
    );
    
    return campoMasModificado;
  }

  volver(): void {
    this.router.navigate(['/adquisiciones']);
  }
}
