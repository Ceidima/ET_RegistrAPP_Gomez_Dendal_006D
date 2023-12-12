import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../servicios/auth.service';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  userdata: any;
  numero : any;

  constructor(
    public authservice: AuthService,
    private toastController: ToastController,
  ) {
    this.userdata = sessionStorage.getItem('username');
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.numero = sessionStorage.getItem('id');
  }


 

  async showToast(msg: any){
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    })
    toast.present();
  }

  Logout(){
    this.authservice.Logout();
    this.showToast('Sesión cerrada');
  }
}
