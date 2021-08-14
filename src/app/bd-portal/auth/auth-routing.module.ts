import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { ProfileComponent } from '../structure/pages/profile/profile.component';
import { LoginComponent } from './component/pages/login/login.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  // {path: 'profile', component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
