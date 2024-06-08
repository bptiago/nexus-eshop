import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { SignUpSellerComponent } from './sign-up-seller/sign-up-seller.component';
import { SignUpUserComponent } from './sign-up-user/sign-up-user.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'signUp', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signUpSeller', component: SignUpSellerComponent },
  { path: 'signUpUser', component: SignUpUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
