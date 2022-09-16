import { HttpClientModule } from '@angular/common/http';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { DetailsUserComponent } from './details-user/details-user.component';


@NgModule({
  declarations: [
    DetailsUserComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,

  ]
})
export class UsersModule { }
