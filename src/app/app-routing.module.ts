import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './components/notfound/notfound.component';

const routes: Routes = [

  {
    path:'',
    component:HomeComponent
  },
  {
    path:'users',
    loadChildren:()=>import('./components/users/users.module').then(x=>x.UsersModule),
  },
  {
    path:'**',
    component:NotfoundComponent
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

exports: [RouterModule]
})
export class AppRoutingModule { }
