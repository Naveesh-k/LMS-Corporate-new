import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LmsRoutingModule } from './lms-routing.module';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [BrowserModule],
  imports: [CommonModule, LmsRoutingModule],
})
export class LmsModule {}
