import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LmsRoutingModule } from './lms-routing.module';
import { BrowserModule } from '@angular/platform-browser';
// Import text-editor
import { NgxEditorModule } from 'ngx-editor';

@NgModule({
  declarations: [],
  imports: [CommonModule, LmsRoutingModule, BrowserModule, NgxEditorModule],
})
export class LmsModule {}
