import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BdPortalRoutingModule } from './bd-portal-routing.module';
import { CommonFooterComponent } from './common-footer/common-footer.component';

@NgModule({
  declarations: [
    CommonFooterComponent
  ],
  imports: [CommonModule, BdPortalRoutingModule],
})
export class BdPortalModule {}
