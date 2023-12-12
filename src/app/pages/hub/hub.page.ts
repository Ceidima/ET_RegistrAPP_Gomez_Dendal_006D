import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../../servicios/auth.service';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-hub',
  templateUrl: './hub.page.html',
  styleUrls: ['./hub.page.scss'],
})
export class HubPage implements OnInit {

  userdata: any;
  
  numero : any;

  constructor(
    private menuController: MenuController,
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


  MostrarMenu(){
    this.menuController.open('first');
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
