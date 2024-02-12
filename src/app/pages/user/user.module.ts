import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserPageRoutingModule } from './user-routing.module';

import { UserPage } from './user.page';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ShowProfileComponent } from './show-profile/show-profile.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserPageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    UserPage,
    EditProfileComponent,
    ShowProfileComponent,
  ]
})
export class UserPageModule {}
