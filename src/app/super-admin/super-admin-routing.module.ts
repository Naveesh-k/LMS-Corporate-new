import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('../super-admin/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'app',
    loadChildren: () =>
      import('../super-admin/structure/structure.module').then(
        (m) => m.StructureModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
