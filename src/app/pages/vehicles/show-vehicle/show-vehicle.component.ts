import { Component} from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { VehicleService } from 'src/app/services/vehicle.service';
import { Vehicle } from '../interfaces/vehicles.interface';

@Component({
  selector: 'app-show-vehicle',
  templateUrl: './show-vehicle.component.html',
  styleUrls: ['./show-vehicle.component.scss'],
})
export class ShowVehicleComponent  {

  public vehicle!:Vehicle;


  constructor(private vehicleService:VehicleService, private router: Router, private alertController: AlertController) { 
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.vehicle = navigation.extras["state"]["vehicle"];
    }
  }

  async OndeleteVehicle() {

    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que quieres eliminar este vehículo?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => { }
        }, {
          text: 'Sí',
          handler: () => {
            this.vehicleService.deleteVehicle(this.vehicle.id).subscribe({
              next: (resp:any)=>{
                console.log(resp?.status);
                
                if(resp && resp?.status === "success"){
                  this.router.navigateByUrl('/vehicles/list');
                }
              },
              error:(error)=> {
                console.error('Error al eliminar:', error);
                let token = localStorage.getItem('token');
                if (token && token === "faketoken") {
                  let vehiclesRaw = localStorage.getItem('vehiclesList');
                  let vehicles = JSON.parse(vehiclesRaw!);
                  vehicles = vehicles.filter((element: any) => element.id !== this.vehicle.id);
                  let itemsString = JSON.stringify(vehicles);
                  localStorage.setItem('vehiclesList', itemsString);
                }
              }
            }
              

              );

          }
        }
      ]
    });

    await alert.present();
  }

  getPhotoVehicle( ){
    return this.vehicle.image ? this.vehicle.image : "/assets/img/card-media.png";
  }

  onClick(){
    this.router.navigateByUrl('/vehicles/list');
  }

}
