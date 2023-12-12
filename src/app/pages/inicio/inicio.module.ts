import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../../servicios/auth.service'; // Ajusta la ruta según la estructura de tu proyecto

import { InicioPageRoutingModule } from './inicio-routing.module';
import { InicioPage } from './inicio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioPageRoutingModule
  ],
  declarations: [InicioPage],
  providers: [AuthService], // Asegúrate de proporcionar el servicio aquí si es necesario
})
export class InicioPageModule {}
