import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Router } from "@angular/router";
import { CustomcomponentComponent } from "./customcomponent/customcomponent.component";
import { Customcomponent2Component } from "./customcomponent2/customcomponent2.component";
import { LoginFormComponent } from './login-form/login-form.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { authGuard } from './auth.guard';



const routes:Routes=[

  {
    component:CustomcomponentComponent,
    path:'Custom-component-Component'
  },
  {
    component:Customcomponent2Component,
    path:'Custom-component2-Component'
  }, 
  {
    component:LoginFormComponent,
    path:'login-form',
    canActivate: [authGuard]
  },  
  {
    component:UserDetailsComponent,
    path:'user-details/:id'
  },  
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule],
})
export class AppRoutingModule { }
