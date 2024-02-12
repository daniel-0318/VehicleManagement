import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss'],
})
export class MapModalComponent {

  @ViewChild('map') mapRef!: ElementRef<HTMLElement>;
  map!:GoogleMap;
  coordenadas: string = '';
  @Output() address = new EventEmitter;
  coordinates:any = {};
  marker: any;

  constructor() { 
    this.createMap();
  }


  public async createMap(){
    this.coordinates = await this.getCurrentCoordinates();
    this.map = await GoogleMap.create({
      id: 'my-map',
      element: this.mapRef.nativeElement,
      apiKey: environment.mapsKey,
      config: {
        center: this.coordinates,
        zoom: 18,
      },
    });
    
    this.setMarker(this.coordinates);

    this.map.setOnMapClickListener(({latitude, longitude} )=>{
      console.log("click coorde");
      
      this.setMarker({lat: latitude, lng:longitude});
    
    });

  }

  async setMarker(coordinate:any){
    
    if(this.marker){
      this.map.removeMarker(this.marker);
    }
    this.marker = await this.map.addMarker({
      coordinate
    });
    this.coordinates = coordinate;
  }

  async getCurrentCoordinates() {
    const coordinates = await Geolocation.getCurrentPosition();
    return {
      lat: coordinates.coords.latitude,
      lng: coordinates.coords.longitude,
    };
  }

  public selectCoord(){
    this.coordenadas = `${this.coordinates.lat.toFixed(6)}, ${this.coordinates.lng.toFixed(6)}`;
    this.address.emit(this.coordenadas)
  }

}
