import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  title:string = "Iniciar sesión";

  constructor(private router:Router) { }

  ngOnInit() {
    this.router.events
    .subscribe(()=>{
      if(this.router.url.includes('auth/register')){
        this.title = "Registrarse";
      }else{
        this.title = "Iniciar sesión";

      }
    });
    
  }

}
