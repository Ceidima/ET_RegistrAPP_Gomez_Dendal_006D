import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { User } from '../../interfaces/interfaces';
import { MenuController } from '@ionic/angular';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  registroForm: FormGroup;

  newUsuario: User={
    username:'',
    password: '',
    rut: '',
    correo:'',
    materia1:'',
    materia2:'',
    rol: '',
    isactive: false
  }

  constructor(private authservice: AuthService,
              private alertcontroller: AlertController,
              private router: Router,
              private menuController: MenuController,
              private fbuilder: FormBuilder) { 
                this.registroForm = this.fbuilder.group({ 
                  'username' : new FormControl("", [Validators.required, Validators.minLength(4)]),
                  'password' : new FormControl("", [Validators.required, Validators.minLength(8)]),
                  'rut' : new FormControl("", [Validators.required, Validators.minLength(9)]),
                  'correo' : new FormControl("", [Validators.required, Validators.minLength(4)]),
                  'materia1': new FormControl(''),
                  'materia2': new FormControl(''),  
                  'rol': new FormControl("", Validators.required)
                })
    }

  ngOnInit() {
  }

  MostrarMenu(){
    this.menuController.open('first');
  }

  onRolChange() {
    // Lógica adicional si es necesario al cambiar el rol
  }

  registrarUsuario(){

    //controlar que el usuario no se duplique y mostrar alerta en caso que exista 
    if (this.registroForm && this.registroForm.get('rol')){
      if (this.registroForm.get('rol')?.value === 'Profesor'){
        {
          this.newUsuario.username = this.registroForm.value.username;
          this.newUsuario.password = this.registroForm.value.password;
          this.newUsuario.rol = this.registroForm.value.rol;
          this.newUsuario.rut =this.registroForm.value.rut;
          this.newUsuario.correo = this.registroForm.value.correo;
          this.newUsuario.materia1 = this.registroForm.value.materia1;
          this.newUsuario.materia2 = this.registroForm.value.materia2;
          this.newUsuario.isactive=true;
          this.authservice.CrearProfesor(this.newUsuario).subscribe();
          this.authservice.CrearUsuario(this.newUsuario).subscribe();
          this.mostrarMensaje();
          this.registroForm.reset();
          this.router.navigateByUrl("/login");
        }
      }
    }

    //controlar que el usuario no se duplique y mostrar alerta en caso que exista 
    if (this.registroForm && this.registroForm.get('rol')){
      if (this.registroForm.get('rol')?.value === 'Estudiante'){
        {
          this.newUsuario.username = this.registroForm.value.username;
          this.newUsuario.password = this.registroForm.value.password;
          this.newUsuario.rol = this.registroForm.value.rol;
          this.newUsuario.rut =this.registroForm.value.rut;
          this.newUsuario.correo = this.registroForm.value.correo;
          this.newUsuario.isactive=true;
          this.authservice.CrearEstudiantes(this.newUsuario).subscribe();
          this.authservice.CrearUsuario(this.newUsuario).subscribe();
          this.mostrarMensaje();
          this.registroForm.reset();
          this.router.navigateByUrl("/login");
        }
      }
    }
  }

  async mostrarMensaje(){
    const alerta = await this.alertcontroller.create({ 
      header: 'Usuario cread@',
      message: 'Bienvenido! '+ this.newUsuario.username+ ' :D',
      buttons: ['Ok']
    });
    alerta.present();
  }


}
