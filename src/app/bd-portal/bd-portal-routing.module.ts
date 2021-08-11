import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      // import('./bd-portal/auth/auth.module').then((m) => m.AuthModule),
      import('../bd-portal/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'structure',
    loadChildren: () =>
      // import('./bd-portal/structure/structure.module').then(
      import('../bd-portal/structure/structure.module').then(
        (m) => m.StructureModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BdPortalRoutingModule {}
