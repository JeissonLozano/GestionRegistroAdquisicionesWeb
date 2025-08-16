import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { AppState } from '../../../../core/state/app.state';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { selectAdquisiciones } from '../../../../core/state/adquisiciones/adquisiciones.selectors';
import { AdquisicionService } from '../../../../core/services/adquisicion.service';
import { Adquisicion } from '../../../../core/models/adquisicion.model';

@Component({
  selector: 'app-form-adquisicion',
  standalone: true,
  templateUrl: './form-adquisicion.component.html',
  styleUrls: ['./form-adquisicion.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent]
})
export class FormAdquisicionComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private store = inject(Store<AppState>);
  private adquisicionService = inject(AdquisicionService);

  form!: FormGroup;
  isEditMode = false;
  adquisicionId: number | null = null;
  adquisicionCreada = false;
  cargando = false;
  error = '';

  ngOnInit(): void {
    this.initForm();
    this.checkEditMode();
  }

  private initForm(): void {
    this.form = this.fb.group({
      presupuesto: ['', [Validators.required, Validators.min(0)]],
      unidadAdministrativa: ['', Validators.required],
      tipoBienServicio: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(1)]],
      valorUnitario: ['', [Validators.required, Validators.min(0)]],
      valorTotal: ['', [Validators.required, Validators.min(0)]],
      fechaAdquisicion: ['', Validators.required],
      proveedor: ['', Validators.required],
      documentacion: ['']
    });

    // Calcular valor total automáticamente
    this.form.get('cantidad')?.valueChanges.subscribe(() => this.calcularValorTotal());
    this.form.get('valorUnitario')?.valueChanges.subscribe(() => this.calcularValorTotal());
  }

  private checkEditMode(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.adquisicionId = +id;
      this.cargarAdquisicion(+id);
    }
  }

  private cargarAdquisicion(id: number): void {
    // Cargar datos de la adquisición desde el store
    this.store.select(selectAdquisiciones).subscribe((adquisiciones) => {
      const adquisicion = adquisiciones.find(a => a.id === id);
      if (adquisicion) {
        console.log('Adquisición encontrada:', adquisicion);
        
        // Formatear la fecha para el input de tipo date
        let fechaFormateada = '';
        if (adquisicion.fechaAdquisicion) {
          const fecha = new Date(adquisicion.fechaAdquisicion);
          fechaFormateada = fecha.toISOString().split('T')[0]; // Formato yyyy-MM-dd
        }

        // Cargar los datos en el formulario
        this.form.patchValue({
          presupuesto: adquisicion.presupuesto || '',
          unidadAdministrativa: adquisicion.unidadAdministrativa || '',
          tipoBienServicio: adquisicion.tipoBienServicio || '',
          cantidad: adquisicion.cantidad || '',
          valorUnitario: adquisicion.valorUnitario || '',
          valorTotal: adquisicion.valorTotal || '',
          fechaAdquisicion: fechaFormateada,
          proveedor: adquisicion.proveedor || '',
          documentacion: adquisicion.documentacion || ''
        });

        // Marcar el formulario como pristine después de cargar los datos
        this.form.markAsPristine();
        this.form.markAsUntouched();
      } else {
        console.error('No se encontró la adquisición con ID:', id);
        // Si no se encuentra, redirigir a la lista
        this.router.navigate(['/adquisiciones']);
      }
    });
  }

  private calcularValorTotal(): void {
    const cantidad = this.form.get('cantidad')?.value || 0;
    const valorUnitario = this.form.get('valorUnitario')?.value || 0;
    const valorTotal = cantidad * valorUnitario;
    
    this.form.patchValue({ valorTotal });
  }

  onSubmit(): void {
    if (this.form.valid) {
      if (this.isEditMode) {
        this.actualizarAdquisicion();
      } else {
        this.crearAdquisicion();
      }
    } else {
      this.marcarCamposComoTocados();
    }
  }

  private crearAdquisicion(): void {
    this.cargando = true;
    this.error = '';

    const adquisicionData: Adquisicion = {
      presupuesto: this.form.get('presupuesto')?.value,
      unidadAdministrativa: this.form.get('unidadAdministrativa')?.value,
      tipoBienServicio: this.form.get('tipoBienServicio')?.value,
      cantidad: this.form.get('cantidad')?.value,
      valorUnitario: this.form.get('valorUnitario')?.value,
      valorTotal: this.form.get('valorTotal')?.value,
      fechaAdquisicion: this.form.get('fechaAdquisicion')?.value,
      proveedor: this.form.get('proveedor')?.value,
      documentacion: this.form.get('documentacion')?.value,
      usuarioModificador: 'Usuario Actual' // Valor por defecto
    };

    console.log('📡 Creando adquisición:', adquisicionData);

    this.adquisicionService.createAdquisicion(adquisicionData).subscribe({
      next: (response) => {
        console.log('✅ Adquisición creada exitosamente:', response);
        this.cargando = false;
        this.adquisicionCreada = true;
        
        setTimeout(() => {
          this.adquisicionCreada = false;
          this.router.navigate(['/adquisiciones']);
        }, 3000);
      },
      error: (error) => {
        console.error('❌ Error al crear adquisición:', error);
        this.cargando = false;
        this.error = 'Error al crear la adquisición. Por favor, inténtalo de nuevo.';
      }
    });
  }

  private actualizarAdquisicion(): void {
    if (!this.adquisicionId) {
      this.error = 'ID de adquisición no válido';
      return;
    }

    this.cargando = true;
    this.error = '';

    const adquisicionData: Adquisicion = {
      id: this.adquisicionId,
      presupuesto: this.form.get('presupuesto')?.value,
      unidadAdministrativa: this.form.get('unidadAdministrativa')?.value,
      tipoBienServicio: this.form.get('tipoBienServicio')?.value,
      cantidad: this.form.get('cantidad')?.value,
      valorUnitario: this.form.get('valorUnitario')?.value,
      valorTotal: this.form.get('valorTotal')?.value,
      fechaAdquisicion: this.form.get('fechaAdquisicion')?.value,
      proveedor: this.form.get('proveedor')?.value,
      documentacion: this.form.get('documentacion')?.value,
      usuarioModificador: 'Usuario Actual' // Valor por defecto
    };

    console.log('📡 Actualizando adquisición:', adquisicionData);

    this.adquisicionService.updateAdquisicion(this.adquisicionId, adquisicionData).subscribe({
      next: () => {
        console.log('✅ Adquisición actualizada exitosamente');
        this.cargando = false;
        this.adquisicionCreada = true;
        
        setTimeout(() => {
          this.adquisicionCreada = false;
          this.router.navigate(['/adquisiciones']);
        }, 3000);
      },
      error: (error) => {
        console.error('❌ Error al actualizar adquisición:', error);
        this.cargando = false;
        this.error = 'Error al actualizar la adquisición. Por favor, inténtalo de nuevo.';
      }
    });
  }

  private marcarCamposComoTocados(): void {
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  volver(): void {
    this.router.navigate(['/adquisiciones']);
  }

  limpiarError(): void {
    this.error = '';
  }
}
