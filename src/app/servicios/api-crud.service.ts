import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { IEstudiante, User, Users } from '../interfaces/interfaces';
import { IEstudiantes } from '../interfaces/interfaces';
import { qrcode,qrcodes } from '../interfaces/interfaces';


@Injectable({
  providedIn: 'root'
})
export class ApiCrudService {

  constructor(private httpclient:HttpClient) { }

  listarEstudiantes():Observable<Users>{
    return this.httpclient.get<Users>(`${environment.apiURL}/estudiantes`);

  }

  AgregarEstudiante(newEstudiante: IEstudiante): Observable<IEstudiante>{
    return this.httpclient.post<IEstudiantes>(`${environment.apiURL}/estudiantes`, newEstudiante);
  }

  ActualizarEstudiante(estudiante:any):Observable<Users>{
    return this.httpclient.put<Users>(`${environment.apiURL}/estudiantes/${estudiante.id}`,estudiante );
  }

  ActualizarProfesor(estudiante:any):Observable<Users>{
    return this.httpclient.put<Users>(`${environment.apiURL}/profesores/${estudiante.id}`,estudiante );
  }

  ActualizarProfesorByNombre(profesor: any): Observable<Users> {
    return this.httpclient.put<Users>(`${environment.apiURL}/profesores/${profesor.username}`, profesor);
  }

  buscarEstudiante(id: number):Observable<Users>{
    return this.httpclient.get<Users>(`${environment.apiURL}/estudiantes/?id=${id}`);
  }

  EliminarEstudiante(estudiante: any):Observable<IEstudiantes>{
    return this.httpclient.delete<IEstudiantes>(`${environment.apiURL}/estudiantes/${(estudiante.id)}`);
  }

  CrearQR(newQR: qrcode):Observable<qrcodes>{
    return this.httpclient.post<qrcodes>(`${environment.apiURL}/QRcodes`,newQR)
  }

}
