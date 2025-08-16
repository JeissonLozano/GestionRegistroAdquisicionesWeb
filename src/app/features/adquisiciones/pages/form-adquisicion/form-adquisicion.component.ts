import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { AppState } from '../../../../core/state/app.state';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { selectAdquisiciones } from '../../../../core/state/adquisiciones/adquisiciones.selectors';

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

  form!: FormGroup;
  isEditMode = false;
  adquisicionId: number | null = null;
  adquisicionCreada = false;

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
    console.log('Creando adquisición:', this.form.value);
    this.adquisicionCreada = true;
    
    setTimeout(() => {
      this.adquisicionCreada = false;
      this.router.navigate(['/adquisiciones']);
    }, 3000);
  }

  private actualizarAdquisicion(): void {
    console.log('Actualizando adquisición:', this.form.value);
    this.adquisicionCreada = true;
    
    setTimeout(() => {
      this.adquisicionCreada = false;
      this.router.navigate(['/adquisiciones']);
    }, 3000);
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
}
