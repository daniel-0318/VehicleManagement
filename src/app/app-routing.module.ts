import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children:[
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'vehicles',
      },
      {
        path: 'user',
        loadChildren: () => import('./pages/user/user.module').then( m => m.UserPageModule)
      },
      {
        path: 'vehicles',
        loadChildren: () => import('./pages/vehicles/vehicles.module').then( m => m.VehiclesPageModule)
      },

    ]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: '**',
    redirectTo:'vehicles'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
