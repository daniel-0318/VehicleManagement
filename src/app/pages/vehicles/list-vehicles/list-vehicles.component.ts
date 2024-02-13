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
    console.log("ionViewWillEnter");

    this.page = 1;
    this.vehicles = [];
    this.getVehicles(this.page);

  }

  getVehicles(page: number) {

    this.vehicleService.getVehicles(page).subscribe({
      next: (resp:any)=>{
        console.log(resp);

      if (resp && resp.data) {

        this.vehicles = [...this.vehicles, ...resp.data];

      }
    },
    error: (error) => {
      console.log("manejo error lista");
      setTimeout(() => {
        let itemstemp = localStorage.getItem("items");
        if (itemstemp) {
          this.vehicles = JSON.parse(itemstemp);
        }

      }, 500);
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
    
    this.vehicleService.getVehicles(this.page, this.search_text).subscribe((resp: any) => {

      if (resp && resp.data) {
        this.vehicles = resp.data;
      }

    }, (error) => {
      if(error.status == 0){
        console.log("offline");
        
        let itemstemp = localStorage.getItem("items");
        if (itemstemp) {
          this.vehicles = JSON.parse(itemstemp);
          this.vehicles = this.vehicles.filter((item: any) => {
            console.log("filtro", !this.search_text);
            
            let passesTextFilter = !this.search_text || item.food.includes(this.search_text);
            
            return passesTextFilter;
          });
        }
        
      }



    });
  }

  goCreate() {
    this.router.navigateByUrl('/vehicles/create')
  }

  getPhotoVehicle(vehicle: Vehicle ){
    return vehicle.image ? vehicle.image : "/assets/img/card-media.png";
  }

  showVehicle(vehicle:Vehicle ){
    this.router.navigateByUrl(`/vehicles/${vehicle.id}`,{ state: { vehicle: vehicle } });
  }


}
