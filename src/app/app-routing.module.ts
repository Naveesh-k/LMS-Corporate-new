import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigatePortalComponent } from './navigate-portal/navigate-portal.component';

const routes: Routes = [
  { path: '', component: NavigatePortalComponent },
  {
    path: 'bd-portal',
    loadChildren: () =>
      import('./bd-portal/bd-portal-routing.module').then((m) => m.BdPortalRoutingModule),
  },
  {
    path: 'consultech',
    loadChildren: () =>
      import('./consultech/consultech-routing.module').then((m) => m.ConsultechRoutingModule),
  },
  {
    path: 'lms',
    loadChildren: () =>
      import('./lms/lms-routing.module').then((m) => m.LmsRoutingModule),
  },
  { path: 'auth', loadChildren: () => import('./consultech/auth/auth-routing.module').then(m => m.AuthRoutingModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
