import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SuperAdminRoutingModule } from './super-admin-routing.module';

@NgModule({
  declarations: [],
  imports: [
    SuperAdminRoutingModule,
    CommonModule,
    BrowserModule,
  ]
})
export class SuperAdminModule { }
