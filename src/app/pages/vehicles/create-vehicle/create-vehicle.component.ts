import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PhotoService } from 'src/app/services/photo.service';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-create-vehicle',
  templateUrl: './create-vehicle.component.html',
  styleUrls: ['./create-vehicle.component.scss'],
})
export class CreateVehicleComponent {

  public vehicleForm: FormGroup;
  public listConfiguration = ['CA', '2', '3', '4', '2S2', '2S3', '2S3', '3S3'];
  public listBodyType = ['Furgón', 'Volco', 'Tanque', 'Estacas', 'Porta Contenedor'];


  constructor(private formBuilder: FormBuilder, private vehicleService: VehicleService, 
    private router: Router, private photoService:PhotoService) {

    this.vehicleForm = this.formBuilder.group({
      plate: ['', [Validators.required, Validators.minLength(4)]],
      model_year: ['', [Validators.required, Validators.minLength(4)]],
      configuration: ['', [Validators.required,]],
      body_type: ['', [Validators.required]],
      image: [''],
    });
  }

  onSubmit() {
    if (this.vehicleForm.valid) {
      let data = this.vehicleForm.value;
      
      if(data.image== ''){
        
        delete data.image;
      }
      this.vehicleService.createVehicle(data).subscribe({
        next: (resp:any)=>{
        
          if (resp && resp.data.id) {
            this.router.navigateByUrl("/vehicles/list");
          }
        }, error: (error) => {;
          
          if (error.status == 0) {

            let itemsTemp = localStorage.getItem("vehiclesList");
            data.id = data.plate;
            if (!itemsTemp) {
              let temp = [data];
              let temp2 = JSON.stringify(temp);
              localStorage.setItem("vehiclesList", temp2);
            } else {
    
              let temp = JSON.parse(itemsTemp);
              temp = [data, ...temp];
              let temp2 = JSON.stringify(temp);
    
    
              localStorage.setItem("vehiclesList", temp2);
    
            }
            this.router.navigateByUrl("/vehicles/list");

          }
        }
      });
    } else {
      this.vehicleForm.markAllAsTouched();
    }
  }

  getImage(type:string){
    const image = this.vehicleForm.get(type)?.value;
    
    if(image){
      return image;
    }else{
      return '/assets/img/car.png';
    }
  }

  addPhotoToGallery() {
    this.photoService.takephoto().then((resp:any) =>{
      this.vehicleForm.get('image')?.setValue(resp);
    }
    );
    
  }

}
