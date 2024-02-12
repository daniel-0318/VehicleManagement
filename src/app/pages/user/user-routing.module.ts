import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserPage } from './user.page';
import { ShowProfileComponent } from './show-profile/show-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

const routes: Routes = [
  {
    path: '',
    component: UserPage,
    children:[
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'show'
      },
      {
        path: 'show',
        component: ShowProfileComponent,
      },
      {
        path: 'edit',
        component: EditProfileComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPageRoutingModule {}
