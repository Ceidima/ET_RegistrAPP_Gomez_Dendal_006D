import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userdata: any;

  usuario={
    id: 0,
    username: "",
    correo: "",
    password: "",
    rol: "",
    isactive: true
  }

  loginForm: FormGroup;

  constructor(
    private authservice: AuthService,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController,
    private builder: FormBuilder,
  ) { 
    this.loginForm = this.builder.group({
      'username' : new FormControl("", [Validators.required, Validators.minLength(4)]),
      'password': new FormControl("", [Validators.required, Validators.minLength(4)])
    })
  }

  ngOnInit() {
  }

  async mostrarAlertaBienvenida(nombreUsuario: string) {
    const alert = await this.alertController.create({
      header: 'Bienvenido',
      message: `Bienvenido, ${nombreUsuario}!`, 
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  login() {
    if (this.loginForm.valid) {
      this.authservice.GetUserById(this.loginForm.value.username).subscribe(resp => {
        this.userdata = resp;
        if (this.userdata.length > 0) {
          this.usuario = {
            id: this.userdata[0].id,
            username: this.userdata[0].username,
            correo: this.userdata[0].correo,
            password: this.userdata[0].password,
            rol: this.userdata[0].rol,
            isactive: this.userdata[0].isactive
          }
          if (this.usuario.password === this.loginForm.value.password) {
            if (this.usuario.isactive) {
              sessionStorage.setItem('id', this.usuario.id.toString());
              sessionStorage.setItem('username', this.usuario.username);
              sessionStorage.setItem('rol', this.usuario.rol);
              sessionStorage.setItem('password', this.usuario.password);
              sessionStorage.setItem('activo', this.usuario.isactive.toString());
              sessionStorage.setItem('ingresado', 'true');
              this.showToast('Sesión Iniciada');
              this.loginForm.reset();
              this.router.navigateByUrl("/hub");
            } else {
              this.UserInactivo(); 
              this.loginForm.reset();
            }  
          } else {
            this.ErrorDatos();
            this.loginForm.reset();
          }
        } else {
          this.ErrorDatos();
          this.loginForm.reset();
        }
      })
    } else {
      this.NoExiste();
      this.loginForm.reset();
    }
  }

  
  async showToast(msg: any){
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    })
    toast.present();
  }

  async UserInactivo(){
    const alerta = await this.alertController.create({
      header: 'Error...',
      message: 'Usuario inactivo, contactar admin',
      buttons: ['OK']
    })
    alerta.present();
    return;
  }

  async ErrorDatos(){
    const alerta = await this.alertController.create({
      header: 'Error...',
      message: 'Revise sus credenciales',
      buttons: ['OK']
    })
    alerta.present();
    return;
  }

  async NoExiste(){
    const alerta = await this.alertController.create({
      header: 'Error...',
      message: 'Este Usuario no Existe',
      buttons: ['OK']
    })
    alerta.present();
    return;
  }
}
