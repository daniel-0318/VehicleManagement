import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private http = inject(HttpClient);

  header = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  public getHeader() {
    let token = localStorage.getItem('token')
    let headers = this.header.append('Authorization', `Bearer ${token}`);
    return headers;
  }

  public getVehicles(page:number, search:string=""){
    return this.http.get(`${environment.url}/v1/vehicles?search=${search}&page=${page}`,{headers:this.getHeader()});
  }

  public createVehicle(data:any){
    return this.http.post(`${environment.url}/v1/vehicles`,data,{headers:this.getHeader()});
  }

  public deleteVehicle(id:number){
    return this.http.delete(`${environment.url}/v1/vehicles/${id}`,{headers:this.getHeader()});
  }
}
