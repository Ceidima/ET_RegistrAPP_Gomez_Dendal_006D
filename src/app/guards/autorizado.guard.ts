import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../servicios/auth.service';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AutorizadoGuard implements CanActivate {

  constructor (
    private authService: AuthService,
    private toastController: ToastController,
    private router: Router
  ) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.IsLoggedIn()){
      this.showToast('Debes iniciar sesión!');
      this.router.navigate(['/login']);
      return false;
    }
    this.authService.IsLoggedIn();
    return true;
  }  

  async showToast(msg: any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    })
    toast.present();
  }

}