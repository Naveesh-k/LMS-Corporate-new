import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BdPortalRoutingModule } from './bd-portal-routing.module';
import { StructureModule } from './structure/structure.module';

@NgModule({
  declarations: [
  ],
  imports: [CommonModule, BdPortalRoutingModule, StructureModule],
})
export class BdPortalModule {}
