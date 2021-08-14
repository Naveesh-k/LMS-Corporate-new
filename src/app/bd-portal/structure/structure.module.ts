import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StructureRoutingModule } from './structure-routing.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { HeaderComponent } from './common/header/header.component';
import { StructureComponent } from './structure.component';

@NgModule({
  declarations: [
    StructureComponent,
    ProfileComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    StructureRoutingModule
  ],
  bootstrap: [StructureComponent],
})
export class StructureModule {}
