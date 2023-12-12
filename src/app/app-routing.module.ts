import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AutorizadoGuard } from './guards/autorizado.guard';
import { NotActiveGuard } from './guards/not-active.guard';
import { ProfAutorizadoGuard } from './guards/prof-autorizado.guard';
import { AlumnoAutorizadoGuard } from './guards/alumno-autorizado.guard';

const routes: Routes = [
   {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule),
    canActivate: [NotActiveGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canActivate: [NotActiveGuard]
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule),
    canActivate: [NotActiveGuard]
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule),
    canActivate: [AutorizadoGuard]
  },
  {
    path: 'estudiantes/:id',
    loadChildren: () => import('./pages/estudiantes/estudiantes.module').then( m => m.EstudiantesPageModule),
    canActivate: [AutorizadoGuard]
  },
  {
    path: 'listar',
    loadChildren: () => import('./pages/listar/listar.module').then( m => m.ListarPageModule),
    canActivate: [ProfAutorizadoGuard]
  },
  {
    path: 'actualizar/:id',
    loadChildren: () => import('./pages/actualizar/actualizar.module').then( m => m.ActualizarPageModule),
    canActivate: [AutorizadoGuard]
  },
  {
    path: 'eliminar/:id',
    loadChildren: () => import('./pages/eliminar/eliminar.module').then( m => m.EliminarPageModule),
    canActivate: [AutorizadoGuard]
  },
  {
    path: 'perfil/:id',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule),
    canActivate: [AutorizadoGuard]
  },
  {
    path: 'hub',
    loadChildren: () => import('./pages/hub/hub.module').then( m => m.HubPageModule),
    canActivate: [AutorizadoGuard]
  },
  {
    path: 'qr/:id',
    loadChildren: () => import('./pages/qr/qr.module').then( m => m.QrPageModule),
    canActivate: [ProfAutorizadoGuard]
  },
  {
    path: 'scanner',
    loadChildren: () => import('./pages/scanner/scanner.module').then( m => m.ScannerPageModule),
    canActivate: [AlumnoAutorizadoGuard]
  },
  {
    path: 'noticias',
    loadChildren: () => import('./pages/noticias/noticias.module').then( m => m.NoticiasPageModule),
    canActivate: [AutorizadoGuard]
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
