import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehiclesPage } from './vehicles.page';
import { ListVehiclesComponent } from './list-vehicles/list-vehicles.component';
import { CreateVehicleComponent } from './create-vehicle/create-vehicle.component';
import { ShowVehicleComponent } from './show-vehicle/show-vehicle.component';

const routes: Routes = [
  {
    path: '',
    component: VehiclesPage,
    children:[
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list',
      },
      {
        path: 'list',
        component: ListVehiclesComponent,
      },
      {
        path: 'create',
        component: CreateVehicleComponent,
      },
      {
        path: ':id',
        component: ShowVehicleComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehiclesPageRoutingModule {}
