import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../servicios/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class ProfAutorizadoGuard implements CanActivate {

  constructor (
    private authService: AuthService,
    private router: Router,
    private toastController:ToastController) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.IsProfesor()){
      this.showToast('Debes ser profesor!');
      this.router.navigate(['/hub']);
      return false;
    }
    this.authService.IsProfesor();
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
