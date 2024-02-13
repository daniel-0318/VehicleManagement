import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, InfiniteScrollCustomEvent } from '@ionic/angular';
import { VehicleService } from '../../../services/vehicle.service';
import { Vehicle } from '../interfaces/vehicles.interface';

@Component({
  selector: 'app-list-vehicles',
  templateUrl: './list-vehicles.component.html',
  styleUrls: ['./list-vehicles.component.scss'],
})
export class ListVehiclesComponent {

  public vehicles: any = [];
  public search_text: string = '';
  public page: number = 1;

  constructor(private vehicleService: VehicleService, private router: Router, public alertController: AlertController) {
    // this.getVehicles(1);
  }

  onIonInfinite(ev: any) {

    this.page = this.page + 1;

    this.getVehicles(this.page);

    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);


  }

  ionViewWillEnter() {
    this.page = 1;
    this.vehicles = [];
    this.getVehicles(this.page);

  }

  getVehicles(page: number) {

    this.vehicleService.getVehicles(page).subscribe({
      next: (resp: any) => {

        if (resp && resp.data) {

          this.vehicles = [...this.vehicles, ...resp.data];

        }
      },
      error: (error) => {
        if (error.status == 0) {
          setTimeout(() => {
            let itemstemp = localStorage.getItem("vehiclesList");
            if (itemstemp) {
              this.vehicles = JSON.parse(itemstemp);
            }

          }, 500);
        }
      }
    });
  }

  searchText(event: any) {

    const text = event.target.value;

    if (text === "") {
      this.search_text = "";

      this.vehicles = [];
      this.page = 1;
      this.getVehicles(this.page);
      return;
    }
    this.search_text = text;
    this.search();

  }

  search() {
    console.log("searching");

    this.vehicleService.getVehicles(this.page, this.search_text).subscribe({
      next: (resp: any) => {

        if (resp && resp.data) {
          this.vehicles = resp.data;
        }
  
      }, error: (error) => {
        if (error.status == 0) {
  
          let vehiclestemp = localStorage.getItem("vehiclesList");
          if (vehiclestemp) {
            this.vehicles = JSON.parse(vehiclestemp);
            this.vehicles = this.vehicles.filter((vehicle: Vehicle) => {
              console.log(vehicle.model_year);
              
              let passesPlateFilter = !this.search_text || vehicle.plate.includes(this.search_text);
              let passesModelYearFilter = !this.search_text || vehicle.model_year.toString().includes(this.search_text);
              
              console.log("filtro", passesPlateFilter || passesModelYearFilter);
              return passesPlateFilter || passesModelYearFilter;
            });
          }
  
        }
  
  
  
      }
    });
  }

  goCreate() {
    this.router.navigateByUrl('/vehicles/create')
  }

  getPhotoVehicle(vehicle: Vehicle) {
    return vehicle.image ? vehicle.image : "/assets/img/card-media.png";
  }

  showVehicle(vehicle: Vehicle) {
    this.router.navigateByUrl(`/vehicles/${vehicle.id}`, { state: { vehicle: vehicle } });
  }


}
