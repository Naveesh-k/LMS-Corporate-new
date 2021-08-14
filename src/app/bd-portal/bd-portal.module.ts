import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BdPortalRoutingModule } from './bd-portal-routing.module';
import { CommonFooterComponent } from './common-footer/common-footer.component';
import { StructureModule } from './structure/structure.module';

@NgModule({
  declarations: [
    CommonFooterComponent
  ],
  imports: [CommonModule, BdPortalRoutingModule, StructureModule],
})
export class BdPortalModule {}
