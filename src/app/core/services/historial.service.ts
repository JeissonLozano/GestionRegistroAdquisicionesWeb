import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';
import { Historial } from '../models/historial.model';

@Injectable({
  providedIn: 'root',
})
export class HistorialService {
  private apiUrl = 'https://localhost:7195/api/historial'; // URL de la API

  constructor(private http: HttpClient) {}

  // Obtener el historial de una adquisición por ID
  getHistorialByAdquisicionId(adquisicionId: number): Observable<Historial[]> {
    const url = `${this.apiUrl}/${adquisicionId}`;
    return this.http.get<Historial[]>(url).pipe(
      catchError(error => this.handleError(error))
    );
  }

  // Manejo de errores HTTP
  private handleError(error: HttpErrorResponse): Observable<Historial[]> {
    if (error.status === 404) {
      console.log(`⚠ No se encontró historial para la adquisición ID: ${error.url}`);
      return of([]); // Retorna un array vacío en caso de 404
    }

    console.error('❌ Error en la comunicación HTTP:', error);
    return throwError(() => new Error('Error en la comunicación HTTP'));
  }
}
