import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';
import { qrcode } from '../../interfaces/interfaces';
import { ApiCrudService } from '../../servicios/api-crud.service';


@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {

  mostrarCodigoQR = false;
  mostrarCodigoQR2 = false;

  numero: any;

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

  newQR: qrcode= {
    username: '',
    correo:'',
    materia: '',
    fecha:'',
  }
  
  constructor(private toastController:ToastController,
              private authService: AuthService,
              private router: Router,
              private apicrud:ApiCrudService) { }

  generarCodigoQR() {
    this.mostrarCodigoQR = true;

    this.newQR.username = this.usuario.username;
    this.newQR.correo = this.usuario.correo;
    this.newQR.materia = this.usuario.materia1;
    this.newQR.fecha = this.getFecha();
    this.apicrud.CrearQR(this.newQR).subscribe();

    // Muestra un mensaje Toast
    this.mostrarToast('Código QR generado exitosamente');
  }

  generarCodigoQR2() {
    this.mostrarCodigoQR2 = true;

    this.newQR.username = this.usuario.username;
    this.newQR.correo = this.usuario.correo;
    this.newQR.materia = this.usuario.materia2;
    this.newQR.fecha = this.getFecha();
    this.apicrud.CrearQR(this.newQR).subscribe();

    // Muestra un mensaje Toast
    this.mostrarToast('Código QR generado exitosamente');
  }

  qrCodeString='Muy buenas a todos' ;
  qrCodeString2='Muy buenas a todos';
  

  ngOnInit() {
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
        this.qrCodeString = `${this.usuario.materia1} - ${this.getFecha()}`;

        this.qrCodeString = `${this.usuario.materia2} - ${this.getFecha()}`;
      }
    )
  }

  getFecha(): string {
    const today = new Date();
    const dd: string | number = today.getDate();
    const mm: string | number = today.getMonth() + 1;
    const yyyy: number = today.getFullYear();

    return `${yyyy}-${mm}-${dd}`;
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000, // Duración en milisegundos
      position: 'bottom',
    });
    toast.present();
  }

}