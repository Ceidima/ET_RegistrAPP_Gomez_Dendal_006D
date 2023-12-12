import { Component } from '@angular/core';

interface Componente{
  name: string;
  icon: string;
  redirecTo: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {}

  componentes : Componente[]=[

    {
      name:'Hub',
      icon: 'laptop-outline',
      redirecTo:'/hub'
    },
    {
      name:'Información',
      icon: 'document-outline',
      redirecTo:'/about'
    },
    {
      name:'Lista',
      icon: 'glasses-outline',
      redirecTo:'/listar'
    },

    {
      name:'Noticias',
      icon: 'newspaper',
      redirecTo:'/noticias'
    },
   

  ]
}
