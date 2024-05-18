import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpApi } from './http-api';
import { Propiedad } from '../interfaces/propiedad.interface';
import { IRespuesta } from '../interfaces/respuesta.interface';
import { Ubicacion } from '../interfaces/ubicacion.interface';

@Injectable({
  providedIn: 'root',
})
export class UbicacionService {
  constructor(private httpClient: HttpClient) {}

  consultarDepartamentos(): Observable<Ubicacion[]> {
    return this.httpClient.get<Ubicacion[]>(HttpApi.CONSULTA_DEPARTAMENTOS_COLOMBIA).pipe(
      map((res) => {
        this.validarMensajeError(res);
        return res;
      })
    );
  }

  consultarCiudades(idDepto:number): Observable<Ubicacion[]> {
    return this.httpClient.get<Ubicacion[]>(`${HttpApi.CONSULTA_DEPARTAMENTOS_COLOMBIA}/${idDepto}/cities`).pipe(
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
