import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigatePortalComponent } from './navigate-portal/navigate-portal.component';

const routes: Routes = [
  { path: '', component: NavigatePortalComponent },
  {
    path: 'bd-portal',
    loadChildren: () =>
      import('./bd-portal/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'lms',
    loadChildren: () =>
      import('./lms/lms-routing.module').then((m) => m.LmsRoutingModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
