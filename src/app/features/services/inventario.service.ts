import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpApi } from './http-api';
import { Propiedad } from '../interfaces/propiedad.interface';
import { IRespuesta } from '../interfaces/respuesta.interface';

@Injectable({
  providedIn: 'root',
})
export class InventarioService {
  constructor(private httpClient: HttpClient) {}

  consultarPropiedades(): Observable<Propiedad[]> {
    return this.httpClient.get<Propiedad[]>(HttpApi.SOLICITUD_BASE).pipe(
      map((res) => {
        this.validarMensajeError(res);
        return res;
      })
    );
  }

  guardarPropiedad(propiedad: Propiedad): Observable<any> {
    return this.httpClient.post<any>(HttpApi.SOLICITUD_BASE, propiedad).pipe(
      map((res) => {
        this.validarMensajeError(res);
        return res;
      })
    );
  }

  editarPropiedad(propiedad: Propiedad): Observable<any> {
    return this.httpClient.post<any>(HttpApi.SOLICITUD_BASE, propiedad).pipe(
      map((res) => {
        this.validarMensajeError(res);
        return res;
      })
    );
  }

  eliminarPropiedad(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${HttpApi.SOLICITUD_BASE}/${id}`).pipe(
      map((res) => {
        this.validarMensajeError(res);
        return res;
      })
    );
  }

  validarMensajeError(res: unknown) {
    const error = res as IRespuesta;
    if (error.error) {
      throw new Error(error.descripcionRespuesta);
    }
  }
}
