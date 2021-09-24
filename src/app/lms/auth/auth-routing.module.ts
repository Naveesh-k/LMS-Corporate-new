import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CpSignUpComponent } from './component/cp-sign-up/cp-sign-up.component';
import { CustomiseTopicComponent } from './component/customise-topic/customise-topic.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { LoginComponent } from './component/login/login.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { UserGroupComponent } from './component/user-group/user-group.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'customise-topic', component: CustomiseTopicComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'user-group', component: UserGroupComponent},
  // Course Provider
  { path: 'cp-sign-up', component: CpSignUpComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
