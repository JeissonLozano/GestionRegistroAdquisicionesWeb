import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private snackBar = inject(MatSnackBar);

  showSuccess(message: string, duration: number = 3000) {
    this.snackBar.open(message, 'Cerrar', {
      duration,
      panelClass: ['toast-success']
    });
  }

  showError(message: string, duration: number = 3000) {
    this.snackBar.open(message, 'Cerrar', {
      duration,
      panelClass: ['toast-error']
    });
  }

  showInfo(message: string, duration: number = 3000) {
    this.snackBar.open(message, 'Cerrar', {
      duration,
      panelClass: ['toast-info']
    });
  }

  showWarning(message: string, duration: number = 3000) {
    this.snackBar.open(message, 'Cerrar', {
      duration,
      panelClass: ['toast-warning']
    });
  }

  // Nuevo método para confirmar operaciones
  showConfirm(message: string, actionText: string = 'Confirmar', cancelText: string = 'Cancelar'): Promise<boolean> {
    return new Promise((resolve) => {
      const snackBarRef = this.snackBar.open(message, actionText, {
        duration: 0, // No se cierra automáticamente
        panelClass: ['toast-confirm'],
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });

      // Manejar la acción de confirmar
      snackBarRef.onAction().subscribe(() => {
        resolve(true);
        snackBarRef.dismiss();
      });

      // Manejar cuando se cierra (cancelar)
      snackBarRef.afterDismissed().subscribe(() => {
        resolve(false);
      });
    });
  }

  // Método para operaciones exitosas de adquisiciones
  showAdquisicionSuccess(operacion: 'desactivada' | 'reactivada', duration: number = 4000) {
    const message = `Adquisición ${operacion} exitosamente`;
    this.showSuccess(message, duration);
  }

  // Método para operaciones de adquisiciones en progreso
  showAdquisicionProgress(operacion: 'desactivando' | 'reactivando') {
    const message = `${operacion.charAt(0).toUpperCase() + operacion.slice(1)} adquisición...`;
    this.showInfo(message, 2000);
  }
}
