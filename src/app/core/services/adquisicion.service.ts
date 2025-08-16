import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Adquisicion } from '../models/adquisicion.model';

@Injectable({
  providedIn: 'root',
})
export class AdquisicionService {
  private apiUrl = 'https://localhost:7195/api/adquisiciones'; // URL de la API

  constructor(private http: HttpClient) {}

  // Obtener todas las adquisiciones
  getAdquisiciones(): Observable<Adquisicion[]> {
    return this.http
      .get<Adquisicion[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  // Obtener una adquisición por ID
  getAdquisicion(id: number): Observable<Adquisicion> {
    const url = `${this.apiUrl}/${id}`;
    return this.http
      .get<Adquisicion>(url)
      .pipe(catchError(this.handleError));
  }

  // Crear una nueva adquisición
  createAdquisicion(adquisicion: Adquisicion): Observable<Adquisicion> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log('📡 Enviando solicitud a la API:', adquisicion);
    return this.http
      .post<Adquisicion>(this.apiUrl, adquisicion, { headers })
      .pipe(catchError(this.handleError));
  }

  // Actualizar una adquisición existente
  updateAdquisicion(id: number, adquisicion: Adquisicion): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log('📡 Enviando solicitud PUT a la API:', adquisicion);
    return this.http
      .put<void>(url, adquisicion, { headers })
      .pipe(catchError(this.handleError));
  }

  // Eliminar (desactivar) una adquisición
  deleteAdquisicion(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}/desactivar`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .put<void>(url, { headers })
      .pipe(catchError(this.handleError));
  }

  // Reactivar una adquisición
  reactivarAdquisicion(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}/reactivar`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log('📡 Enviando solicitud de reactivación a la API para ID:', id);
    return this.http
      .put<void>(url, { headers })
      .pipe(catchError(this.handleError));
  }

  // Manejo de errores HTTP
  private handleError(error: any): Observable<never> {
    console.error('Ocurrió un error:', error);
    return throwError(() => new Error('Error en la comunicación HTTP'));
  }
}
