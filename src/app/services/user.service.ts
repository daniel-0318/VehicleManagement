import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  header = new HttpHeaders(
    {
      'Content-Type': 'application/json',
    });

  constructor(private http: HttpClient) { }

  public getHeader(){
    let token = localStorage.getItem('token')
    let headers = this.header.append('Authorization', `Bearer ${token}`);
    return headers;
  }

  public updateUser(userData: any){
    return this.http.put(`${environment.url}/v1/user/update`, userData,{headers:this.getHeader()});
  }

  public createUser(userData: any){
    return this.http.post(`${environment.url}/register`, userData,{headers:this.header});
  }

  public login(userData: any){
    return this.http.post(`${environment.url}/login`, userData);
  }

  public logout(){
    return this.http.get(`${environment.url}/v1/logout`);
  }

  public getProfile(){

    return this.http.get(`${environment.url}/v1/user/show`,{headers:this.getHeader()});
  }
}
