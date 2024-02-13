import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts.service';
import { UserService } from 'src/app/services/user.service';
import { ValidatorsService } from 'src/app/services/validators.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  public myForm: FormGroup;
  public showPassword:boolean = false;
  

  constructor(private router: Router, private userService:UserService, 
    private formBuilder: FormBuilder, private validatorsService:ValidatorsService, private alertsService:AlertsService) { 

    this.myForm = this.formBuilder.group({
      email:['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)]],
      password:['',[Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin(){

    if(this.myForm.valid){

      let credentials = this.myForm.value;
      credentials.name = 'app';
      this.userService.login(credentials).subscribe((resp:any) => {
        
        if(resp['status'] === 'sucess'){
          this.alertsService.presentToast("Bienvenido");
          localStorage.setItem('token',resp['token']);
          this.router.navigate(['/']);

        }
        
      }, (error:any) => {
        if(error.status == 401){
          this.alertsService.presentAlert("Error al iniciar sesión", "Usuario o contraseña incorrectos");
          
        }else if(error.status == 0){
          
          let local = localStorage.getItem('user');
          let user = JSON.parse(local!);
          if(user?.email === credentials.email && user.password === credentials.password){
            localStorage.setItem('token', 'faketoken');
            this.router.navigateByUrl("/");
          }else{
            this.alertsService.presentAlert("Error al iniciar sesión", "Usuario o contraseña incorrectos");
          }
  
        }
      });
    }else {
      this.myForm.markAllAsTouched();
    }
    
  }

  toggleShowPassword(){
    this.showPassword = !this.showPassword;
  }

  public isValidField(field:string){
    this.validatorsService.isValidField(this.myForm, field);
  }

}
