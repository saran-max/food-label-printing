import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { FoodItemsComponent } from './food-items/food-items.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { FoodItemEntryComponent } from './food-item-entry/food-item-entry.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  {
    path:'',
    component: SignInComponent
  },
  {
    path:'sign-up',
    component: SignupComponent
  },
  {
    path:'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path:'food-items',
    component: FoodItemsComponent
  },
  {
    path:'food-entry',
    component: FoodItemEntryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
