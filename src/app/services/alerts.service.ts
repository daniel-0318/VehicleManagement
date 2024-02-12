import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(private alertController: AlertController, private toastController:ToastController) { }


  async presentAlert(header:string, message:string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['Aceptar']
    });
  
    await alert.present();
  }

  async presentToast(message:string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000
    });
    toast.present();
  }
}
