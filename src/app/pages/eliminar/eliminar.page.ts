import { Component, OnInit } from '@angular/core';
import { ApiCrudService } from 'src/app/servicios/api-crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.page.html',
  styleUrls: ['./eliminar.page.scss'],
})
export class EliminarPage implements OnInit {

  estudiante ={
    id:0,
    nombre:"",
    rut:"",
    correo:""
  }

  constructor(private apiCrud: ApiCrudService,
              private router: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getEstudianteById(this.getIdFromUrl());
  }

  getIdFromUrl(){
    let url=this.router.url;
    let arr=url.split("/",3);
    let id = parseInt(arr[2]);
    return id;
  }

  getEstudianteById(estudianteId: number) {
    this.apiCrud.buscarEstudiante(estudianteId).subscribe(
      (resp:any) => {
        this.estudiante = {
          id: resp[0].id,
          nombre: resp[0].nombre,
          rut: resp[0].rut,
          correo: resp[0].correo
        }
      }
    )
  }

  EliminarEstudiante(){
    this.apiCrud.EliminarEstudiante(this.estudiante).subscribe();
    this.router.navigateByUrl("/listar");
  }
}
