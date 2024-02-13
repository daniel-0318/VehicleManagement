import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts.service';
import { PhotoService } from 'src/app/services/photo.service';
import { UserService } from 'src/app/services/user.service';
import { ValidatorsService } from 'src/app/services/validators.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent{

  profileform: FormGroup;
  profile: any;

  constructor(private fb: FormBuilder, private validatorsService: ValidatorsService,
    public photoService: PhotoService, private userService: UserService,private router: Router,
    private alertsService:AlertsService) {
      
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.profile = navigation.extras["state"]["profile"];
    }
    

    this.profileform = this.fb.group({
      photoProfile: [this.profile.photoProfile],
      name: [this.profile.name, Validators.required],
      lastname: [this.profile.lastname, Validators.required],
      identificationType: [this.profile.identificationType, Validators.required],
      identificationNumber: [this.profile.identificationNumber, Validators.required],
      gender: [this.profile.gender || "no-especificado"],
      phone: [this.profile.phone, [Validators.required, Validators.pattern("^[0-9]+$")]],
      geoAddress: [this.profile.geoAddress],
      photoIdFront: [this.profile.photoIdFront],
      photoIdBack: [this.profile.photoIdBack],
    });
  }


  idValidField(field: string) {
    return this.validatorsService.isValidField(this.profileform, field);
  }

  addPhotoToGallery(campo:string) {
    this.photoService.takephoto().then((resp:any) =>{
      this.profileform.get(campo)?.setValue(resp);
    }
    );
    
  }

  onSubmit() {
    if (this.profileform.valid) {
      const formData = this.profileform.value;
      this.userService.updateUser(formData).subscribe((resp:any) => {
        if(resp && resp?.message==='Sucess'){
          this.alertsService.presentToast("Perfil actualizado");
          this.router.navigateByUrl('/user/show');
        }
      }, error => {
        let temp = JSON.stringify(formData);
        localStorage.setItem("profile", temp);
        this.alertsService.presentToast("Perfil actualizado");
        this.router.navigateByUrl('/user/show');
      });
      
    } else {
      this.profileform.markAllAsTouched();
    }
  }

  public getPhoto(photo:string){
    return this.profileform.get(photo)?.value;
  }

  changeAddress(event:any){
    
    this.profileform.get('geoAddress')?.setValue(event);
  }

  getImage(type:string){
    const image = this.profileform.get(type)?.value;
    console.log(type, image);
    
    if(image){
      return image;
    }else if(type == "photoProfile"){
      return '/assets/img/user.png';
    }else{
      return '/assets/img/dni.png';
    }
  }

}
