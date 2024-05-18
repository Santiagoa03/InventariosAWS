import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Propiedad } from '../../interfaces/propiedad.interface';
import { InventarioService } from '../../services/inventario.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogSimpleComponent } from '../../components/dialog-simple/dialog-simple.component';
import { NotificationService } from '../../services/notification.service';
import { DialogData } from '../../interfaces/dialog-data.interface';
import { AgregarPropiedadComponent } from '../../components/agregar-propiedad/agregar-propiedad.component';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css',
})
export class InventarioComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  form: FormGroup;

  filtroNroDocumento = '';
  filtroDescripcion = '';

  displayedColumns: string[] = [
    'id',
    'nombre',
    'ciudad',
    'departamento',
    'direccion',
    'metros2',
    'tipo',
    'transaccion',
    'precio',
    'estado',
    'acciones',
  ];

  informacionPropiedadesMatData: MatTableDataSource<Propiedad> =
    new MatTableDataSource<Propiedad>();

  constructor(
    private dialog: MatDialog,
    private notificacionService: NotificationService,
    private inventarioService: InventarioService
  ) {}

  ngOnInit(): void {
    this.consultarPropiedades();
    this.informacionPropiedadesMatData.filterPredicate = (
      data,
      filter: string
    ): boolean => {
      const filters = JSON.parse(filter);
      const matchNroDocumento = data.id
        .toString()
        .toLowerCase()
        .includes(filters.nroDocumento);
      const matchDescripcion = data.nombre
        .toLowerCase()
        .includes(filters.descripcion);
      return matchNroDocumento && matchDescripcion;
    };
  }

  ngAfterViewInit(): void {
    this.informacionPropiedadesMatData.paginator = this.paginator;
  }

  consultarPropiedades(): void {
    this.inventarioService.consultarPropiedades().subscribe({
      next: (response) => {
        this.informacionPropiedadesMatData.data = response;
        this.informacionPropiedadesMatData.paginator = this.paginator;
      },
      error: () => {
        this.informacionPropiedadesMatData.data = [];
      },
    });
  }

  agregarPropiedad(): void {
    const data: DialogData = {
      title: 'Agregar Propiedad',
      edit: false,
    };

    var _popup = this.dialog.open(AgregarPropiedadComponent, {
      width: '60%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data,
    });
    _popup.afterClosed().subscribe(() => {
      this.consultarPropiedades();
    });
  }

  editarPropiedad(propiedadSeleccionada: Propiedad): void {
    const data: DialogData = {
      title: 'Editar Propiedad',
      edit: true,
      data: propiedadSeleccionada,
    };

    var _popup = this.dialog.open(AgregarPropiedadComponent, {
      width: '60%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data,
    });
    _popup.afterClosed().subscribe(() => {
      this.consultarPropiedades();
    });
  }

  eliminarPropiedad(propiedadSeleccionada: Propiedad): void {
    const dialog = this.dialog.open(DialogSimpleComponent, {
      width: '40%',
      data: {
        title: 'Confirmación de eliminación',
        message: `¿Está seguro de eliminar la propiedad número:  ${propiedadSeleccionada.id} , ubicada en: ${propiedadSeleccionada.ciudad} - ${propiedadSeleccionada.departamento}?`,
        showCloseButton: true,
      },
    });

    dialog.afterClosed().subscribe((res) => {
      if (res) {
        this.inventarioService
          .eliminarPropiedad(propiedadSeleccionada.id)
          .subscribe({
            next: () => {
              this.notificacionService.openSnackBar(
                'Propiedad Eliminado',
                'right',
                'top',
                2000
              );
              this.consultarPropiedades();
            },
            error: () => {
              this.notificacionService.openSnackBar(
                'Error Al Eliminar La Propiedad',
                'right',
                'top',
                2000
              );
            },
          });
      }
    });
  }

  aplicarFiltros(): void {
    this.informacionPropiedadesMatData.filter = JSON.stringify({
      nroDocumento: this.filtroNroDocumento.toLowerCase(),
      descripcion: this.filtroDescripcion.toLowerCase(),
    });
  }
}
