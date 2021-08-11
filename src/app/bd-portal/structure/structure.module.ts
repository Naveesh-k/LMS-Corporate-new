import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StructureRoutingModule } from './structure-routing.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { FooterComponent } from './common/footer/footer.component';
import { HeaderComponent } from './common/header/header.component';

@NgModule({
  declarations: [ProfileComponent, FooterComponent, HeaderComponent],
  imports: [CommonModule, StructureRoutingModule],
})
export class StructureModule {}
