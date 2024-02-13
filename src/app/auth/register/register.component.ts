import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ValidatorsService } from 'src/app/services/validators.service';
import { AlertsService } from '../../services/alerts.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {

  registerForm: FormGroup;
  showPassword:boolean = false;
  showPassowordConfirm:boolean = false;
  
  constructor(private fb: FormBuilder, private validatorsService:ValidatorsService, 
    private userService:UserService, private router: Router, private alertsService:AlertsService) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)]],
      identificationType: ['', Validators.required],
      identificationNumber: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(6), Validators.pattern("^[0-9]+$")]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required]],
    }, {
      validators: [
        this.validatorsService.isFieldOneEqualFieldTwo('password', 'password2')
      ]
    });
   }

  public idValidField(field:string){
    return this.validatorsService.isValidField(this.registerForm, field);
  }


  public onSubmit() {
    if (this.registerForm.valid) {
      const formData = {...this.registerForm.value};
      delete formData.password2;
      this.userService.createUser(formData).subscribe(resp => {
        this.toLogin();
      }, (error) => {
        this.alertsService.presentToast("Cuenta creada offline")
        const info = JSON.stringify(formData)
        localStorage.setItem("user", info);
        this.router.navigateByUrl("auth/login");
      });
      
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
  
  toLogin(){
    this.router.navigate(['/auth/login'])
  }



  getImage(type:string){
    const image = this.registerForm.get(type)?.value;
    if(image != ""){
      return image;
    }else if(type == "photoProfile"){
      return '/assets/img/user.png';
    }else{
      return '/assets/img/dni.png';
    }
  }

  toggleShowPassword(field:string){
    if(field == "password"){
      this.showPassword = !this.showPassword;
    }else if(field == "passwordConfirm"){
      this.showPassowordConfirm = !this.showPassowordConfirm;
    }
  }

  changeAddress(event:any){
    
    this.registerForm.get('address')?.setValue(event);
  }

}
