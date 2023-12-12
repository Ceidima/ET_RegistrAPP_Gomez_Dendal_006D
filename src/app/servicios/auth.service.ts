import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { User,Users } from '../interfaces/interfaces';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpclient: HttpClient) { }

  GetAllUsers():Observable<Users> {
    return this.httpclient.get<Users>(`${environment.apiURL}/usuarios`);
  }

  GetUserById(codigo: any): Observable<Users> {
    return this.httpclient.get<Users>(`${environment.apiURL}/usuarios/?username=${codigo}`);
  }

  GetUserByUsername(username: string): Observable<Users> {
    return this.httpclient.get<Users>(`${environment.apiURL}/profesores/?username=${username}`);
  }

  IsLoggedIn() {
    return sessionStorage.getItem('username') != null;
  }

  IsProfesor() {
    return sessionStorage.getItem('rol') == 'Profesor';
  }

  IsAlumno() {
    return sessionStorage.getItem('rol') == 'Estudiante';
  }

  GetUserrole() {
    return sessionStorage.getItem('rol') != null ? sessionStorage.getItem('rol')?.toString() : '';
  }

  CrearUsuario(newUsuario: User): Observable<User>{
    return this.httpclient.post<Users>(`${environment.apiURL}/usuarios`, newUsuario);
  }

  CrearProfesor(newUsuario: User): Observable<User>{
    return this.httpclient.post<Users>(`${environment.apiURL}/profesores`, newUsuario);
  }

  CrearEstudiantes(newUsuario: User): Observable<User>{
    return this.httpclient.post<Users>(`${environment.apiURL}/estudiantes`, newUsuario);
  }

  Logout() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('rol');
    sessionStorage.removeItem('password');
    sessionStorage.setItem('ingresado','false');
  }

  BuscarUsuarioId(id:number):Observable<Users>{
    return this.httpclient.get<Users>(`${environment.apiURL}/usuarios/?id=${id}`);
  }

  ActualizarUsuario(usuario:any):Observable<Users>{
    return this.httpclient.put<Users>(`${environment.apiURL}/usuarios/${usuario.id}`, usuario);
  }

  Actualizarprof(username: string, usuario: any): Observable<Users> {
    return this.httpclient.put<Users>(`${environment.apiURL}/usuarios/${username}`, usuario);
  }
  
  listarUsuarios():Observable<Users>{
    return this.httpclient.get<Users>(`${environment.apiURL}/usuarios`);
  }

  
}
