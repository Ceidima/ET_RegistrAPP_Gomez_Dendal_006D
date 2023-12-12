import { Component, OnInit } from '@angular/core';
import { ApiCrudService } from '../../servicios/api-crud.service';
import { AlertController, ToastController } from '@ionic/angular';


import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.page.html',
  styleUrls: ['./actualizar.page.scss'],
})
export class ActualizarPage implements OnInit {


  usuario = {
    id: 0,
    username: '',
    password: '',
    correo: '',
    materia1: '',
    materia2: '',
    rol: '',
    isactive: false
  }

  constructor(private router: Router,
              private authService:AuthService,
              private apicrud:ApiCrudService,
              private toastController:ToastController,
              private alertController:AlertController) { }

  ionViewWillEnter(){
    this.getUsuarioById(this.getIdFromUrl());
  }

  ngOnInit() {
  }

  getIdFromUrl(){
    let url=this.router.url;
    let arr=url.split("/",3);
    let id = parseInt(arr[2]);
    return id;
  }

  getUsuarioById(usuarioID: number) {
    this.authService.BuscarUsuarioId(usuarioID).subscribe(
      (resp: any) => {                 // resp llega en formato de arreglo de un objeto 
        this.usuario = {
          id: resp[0].id,
          username: resp[0].username,
          rol: resp[0].rol,
          password: resp[0].password,
          correo: resp[0].correo,
          materia1: resp[0].materia1,
          materia2: resp[0].materia2,
          isactive: resp[0].isactive
        }
      }
    )
  }

  async UserACtualizado(){
    const alerta = await this.alertController.create({
      header: 'Listo',
      message: 'Los datos del usuario han sido modificados',
      buttons: ['OK']
    })
    alerta.present();
    return;
  }

  updateUsuario(){
    console.log(this.usuario);
    this.authService.ActualizarUsuario(this.usuario).subscribe();
    this.UserACtualizado();

    if (this.usuario.rol === 'estudiante') {
      this.apicrud.ActualizarEstudiante(this.usuario).subscribe();
    }

    if (this.usuario.rol === 'profesor') {
      this.apicrud.ActualizarProfesor(this.usuario).subscribe();
    }

    this.router.navigateByUrl("/hub");
  }
}
