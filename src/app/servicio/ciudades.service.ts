import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CiudadesService {
  public apiHost: string = '../../assets/ciudades_departamentos.json';

  constructor(private http: Http) { }

  getCiudades(): Promise<any> {
    return this.http.get(this.apiHost)
    .toPromise()
    .then((response) => {
      return response.json().rows;
    }).catch((err) => {
      console.log(err);
    });
  }
}
