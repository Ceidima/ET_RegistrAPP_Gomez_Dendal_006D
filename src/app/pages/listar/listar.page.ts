import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { LoadingController } from '@ionic/angular';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { Users } from '../../interfaces/interfaces';
import { ApiCrudService } from '../../servicios/api-crud.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.page.html',
  styleUrls: ['./listar.page.scss'],
})
export class ListarPage  {

  estudiantes: Users[]=[];

  constructor(private authService:AuthService,
              private apicrud:ApiCrudService,
              private loadCtrl: LoadingController,
              private menuController: MenuController) { }

    ionViewWillEnter(){ //actualiza la pag de una cuando se haya creado el objeto
      this.loadEstudiantes();
    }

    MostrarMenu(){
      this.menuController.open('first');
    }
            
  async loadEstudiantes(event?: InfiniteScrollCustomEvent){
    const load=await this.loadCtrl.create({
      message: "Cargando estudiantes...",
      spinner: "bubbles"
    });

    await load.present();
    this.apicrud.listarEstudiantes().subscribe({
      next:resp=>{ 
        console.log(resp);
        load.dismiss();
        let listString=JSON.stringify(resp);
        this.estudiantes=JSON.parse(listString);
        event?.target.complete();
      },
      error: err=>{
        console.log(err.error.message);
        load.dismiss();
      }
    })
  }

}
