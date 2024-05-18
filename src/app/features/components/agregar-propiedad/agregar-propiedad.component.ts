import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '../../services/notification.service';
import { DialogData } from '../../interfaces/dialog-data.interface';
import { InventarioService } from '../../services/inventario.service';
import { ErrorService } from '../../services/errores.service';
import { Propiedad } from '../../interfaces/propiedad.interface';

@Component({
  selector: 'app-agregar-propiedad',
  templateUrl: './agregar-propiedad.component.html',
  styleUrl: './agregar-propiedad.component.css',
})
export class AgregarPropiedadComponent implements OnInit {
  form: FormGroup;

  inputdata: any;
  editdata: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private ref: MatDialogRef<AgregarPropiedadComponent>,
    private fb: FormBuilder,
    public readonly errorService: ErrorService,
    private notificacionService: NotificationService,
    //private loadingService: LoadingService
    private inventarioService: InventarioService
  ) {}

  ngOnInit(): void {
    this.initFormBuilder();
  }

  private initFormBuilder() {
    this.form = this.fb.group({
      nombre: [
        this.data.edit ? this.data.data?.nombre : '',
        [Validators.required, Validators.maxLength(20)],
      ],
      ciudad: [
        this.data.edit ? this.data.data?.ciudad : '',
        [Validators.required, Validators.maxLength(30)],
      ],
      departamento: [
        this.data.edit ? this.data.data?.departamento : '',
        [Validators.required],
      ],
      direccion: [
        this.data.edit ? this.data.data?.direccion : '',
        Validators.required,
      ],
      metros2: [
        this.data.edit ? this.data.data?.metrosCuadrados : '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(/^([0-9])*$/),
        ],
      ],
      tipo: [this.data.edit ? this.data.data?.tipo : '', [Validators.required]],
      transaccion: [
        this.data.edit ? this.data.data?.transaccion : '',
        [Validators.required],
      ],
      precio: [
        this.data.edit ? this.data.data?.precio : '',
        [Validators.required, Validators.pattern(/^([0-9])*$/)],
      ],
      estado: [
        this.data.edit ? this.data.data?.estado : '',
        [Validators.required],
      ],
      descripcion: [
        this.data.edit ? this.data.data?.descripcion : '',
        [Validators.required],
      ],
    });
  }

  closepopup() {
    this.ref.close('Closed using function');
  }

  guardarCliente() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const propiedadNueva: Propiedad = this.obtenerDatosForm();

    //this.loadingService.show();
    this.inventarioService.guardarPropiedad(propiedadNueva).subscribe({
      next: () => {
        this.notificacionService.openSnackBar(
          'Propiedad Agregada Exitosamente',
          'right',
          'top',
          2000
        );
        this.closepopup();
      },
      error: () => {
        this.notificacionService.openSnackBar(
          'Error Al Guardar La Propiedad',
          'right',
          'top',
          2000
        );
      },
    });
    //.add(() => this.loadingService.hide());
  }

  editarCliente() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const propiedadEditada: Propiedad = this.obtenerDatosForm();
    propiedadEditada.id = this.data.data?.id ?? 0;

    //this.loadingService.show();
    this.inventarioService.editarPropiedad(propiedadEditada).subscribe({
      next: () => {
        this.notificacionService.openSnackBar(
          'Propiedad Editada Exitosamente',
          'right',
          'top',
          2000
        );
        this.closepopup();
      },
      error: () => {
        this.notificacionService.openSnackBar(
          'Error Al Editar La Propiedad',
          'right',
          'top',
          2000
        );
      },
    });
    //.add(() => this.loadingService.hide());
  }

  obtenerDatosForm(): Propiedad {
    const {
      nombre,
      ciudad,
      departamento,
      direccion,
      tipo,
      transaccion,
      precio,
      metros2,
      estado,
      descripcion
    } = this.form.value;

    const propiedad: Propiedad = {
      nombre,
      ciudad,
      departamento,
      direccion,
      transaccion,
      tipo,
      precio,
      metrosCuadrados: metros2,
      estado,
      descripcion
    };

    return propiedad;
  }
}
