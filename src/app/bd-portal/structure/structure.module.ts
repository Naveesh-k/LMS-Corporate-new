import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StructureRoutingModule } from './structure-routing.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { HeaderComponent } from './common/header/header.component';
import { StructureComponent } from './structure.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    StructureComponent,
    ProfileComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    StructureRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  bootstrap: [StructureComponent],
})
export class StructureModule {}
