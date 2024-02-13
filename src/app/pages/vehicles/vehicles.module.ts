import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehiclesPageRoutingModule } from './vehicles-routing.module';

import { VehiclesPage } from './vehicles.page';
import { CreateVehicleComponent } from './create-vehicle/create-vehicle.component';
import { ListVehiclesComponent } from './list-vehicles/list-vehicles.component';
import { ShowVehicleComponent } from './show-vehicle/show-vehicle.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VehiclesPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    CreateVehicleComponent,
    ListVehiclesComponent,
    ShowVehicleComponent,
    VehiclesPage,
  ]
})
export class VehiclesPageModule {}
