import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsUserComponent } from './details-user/details-user.component';

const routes: Routes = [

  {
    path:'',
    component:ListComponent,

  }
,
  {
    path:'create',
    component:AddComponent,

  }
, {
  path:'update/:id',
  component:AddComponent,

}
, {
  path:'UserDetails/:id',
  component:DetailsUserComponent,

}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

exports: [RouterModule]
})
export class UsersRoutingModule { }
