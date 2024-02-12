import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-show-profile',
  templateUrl: './show-profile.component.html',
  styleUrls: ['./show-profile.component.scss'],
})
export class ShowProfileComponent{

  public profile:any;

  constructor(private userService:UserService, private router: Router) { 
    
  }

  ionViewWillEnter(){
    this.getProfile();
    
  }

  editProfile(){ 
    this.router.navigateByUrl('/user/edit',{ state: { profile: this.profile } });
  }

  getProfile(){
    this.userService.getProfile().subscribe((resp:any)=>{
      if(resp){
        this.profile = resp;
        this.profile.photoFacial = resp.photoFacial ? resp.photoFacial : '/assets/img/user.png';
        let tempProfile = JSON.stringify( this.profile);
        localStorage.setItem("user", tempProfile );
      }
    }, (error) => {
      if(error.status == 0){
        let temp = localStorage.getItem("profile");
      let tempuser = localStorage.getItem("user");
      if(temp){

        let temp2  = JSON.parse(temp)
        let tempUser  = JSON.parse(tempuser!);
        temp2.photoFacial = tempUser.photoFacial;
        this.profile = temp2;
      }else{
        if(tempuser){

          let temp2  = JSON.parse(tempuser);
          this.profile = temp2;
        }
      }
      }
           

    });
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('items');
    localStorage.removeItem('profile');
    localStorage.removeItem('user');
    this.router.navigateByUrl('auth/login');
    this.userService.logout();
  }

}
