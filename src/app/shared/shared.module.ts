import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapModalComponent } from './map-modal/map-modal.component';



@NgModule({
  declarations: [
    MapModalComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MapModalComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
