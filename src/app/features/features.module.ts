import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeaturesRoutingModule } from './features-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { InventarioComponent } from './pages/inventario/inventario.component';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { InventarioService } from './services/inventario.service';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { DialogSimpleComponent } from './components/dialog-simple/dialog-simple.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AgregarPropiedadComponent } from './components/agregar-propiedad/agregar-propiedad.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    InventarioComponent,
    DialogSimpleComponent,
    AgregarPropiedadComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FeaturesRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatFormField,
    MatLabel,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule
  ],providers:[
    InventarioService
  ]
})
export class FeaturesModule { }
