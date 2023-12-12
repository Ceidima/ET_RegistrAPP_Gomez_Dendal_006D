import { Component, OnInit } from '@angular/core';
import { ApiCrudService } from 'src/app/servicios/api-crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.page.html',
  styleUrls: ['./estudiantes.page.scss'],
})
export class EstudiantesPage implements OnInit {

  numero : any;

  estudiante ={
    id:0,
    username:"",
    rut:"",
    correo:""
  }


  constructor(private apiCrud: ApiCrudService,
              private router: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    const estudianteID = this.getIdFromUrl();
    this.getEstudianteById(estudianteID);
    this.numero = sessionStorage.getItem('id');
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
          username: resp[0].username,
          rut: resp[0].rut,
          correo: resp[0].correo
        }
      }
    )
  }
}
