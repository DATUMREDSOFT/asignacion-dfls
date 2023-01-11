import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private urlServer: string = "https://dfls.datumredsoft.com/Dfls-2-Op-rest/rest/WsAssign/";

  constructor(private http: HttpClient) { }

  getClientesActivos(): Observable<any> {
    return this.http.get(`${this.urlServer}/GetListadoClientesActivo`);
  }

  getIngenierosActivos(): Observable<any> {
    return this.http.get(`${this.urlServer}/GetListadoIngenieros`);
  }

  getContratosPorCliente(cliente: string): Observable<any> {
    return this.http.get(`${this.urlServer}/GetListadoContratosPorCliente?clienteId=${cliente}`);
  }

  postAsignacion(data: any): Observable<any> {
    return this.http.post(`${this.urlServer}/SaveAsignacion`, data);
  }


}
