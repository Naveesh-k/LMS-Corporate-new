import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StructureRoutingModule } from './structure-routing.module';
import { CourseFormComponent } from './pages/course-form/course-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourseListComponent } from './pages/course-list/course-list.component';

import {TableModule} from 'primeng/table';
@NgModule({
  declarations: [
    CourseFormComponent,
    CourseListComponent
  ],
  imports: [
    CommonModule,
    StructureRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        TableModule
  ]
})
export class StructureModule { }
