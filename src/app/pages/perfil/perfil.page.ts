import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  numero : any;
  
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

  constructor(private authService: AuthService,
              private router: Router,
              private alertcontroller: AlertController,
              private menuController: MenuController) { }

  ngOnInit() {
  }

  MostrarMenu(){
    this.menuController.open('first');
  }

  ionViewWillEnter() {
    const usuarioID = this.getIdFromUrl();
    this.getUsuarioById(usuarioID);
    this.numero = sessionStorage.getItem('id');
  }

  getIdFromUrl() {
    let url = this.router.url;
    let arr = url.split("/", 3);
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
        console.log('Usuario:', this.usuario);
      }
    )
  }
}
